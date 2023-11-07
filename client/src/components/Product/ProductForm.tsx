import { ChangeEvent, useCallback, useState } from "react";
import { Product } from "../../interfaces/product";
import { Button, TextField } from "@mui/material";
import { validateField, validateForm } from "../../utils/validators";
import { debounce } from 'lodash';
import React from "react";

interface IssueFormProps {
    product?: Product;
    onSubmit: (product: Omit<Product, 'id'>) => Promise<void>;
    onClose: () => void;
    title: string;
    submitButtonText: string;
    isLoading?: boolean;
}

const initialProductState = {
    title: "",
    description: "",
    price: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    brand: "",
    category: "",
    thumbnail: "",
    images: ""
};

const IssueForm = React.forwardRef<HTMLDivElement, IssueFormProps>(
    ({ product, onSubmit, onClose, title: formTitle, submitButtonText, isLoading }, ref) => {
        const [formData, setFormData] = useState({
            ...initialProductState,
            ...product && {
                title: product.title,
                description: product.description,
                price: product.price.toString(),
                discountPercentage: product.discountPercentage.toString(),
                rating: product.rating.toString(),
                stock: product.stock.toString(),
                brand: product.brand,
                category: product.category,
                thumbnail: product.thumbnail,
                images: product.images.join(', ')
            }
        });

        const [errors, setErrors] = useState<{
            title?: string;
            description?: string;
            price?: string;
            discountPercentage?: string;
            rating?: string;
            stock?: string;
            brand?: string;
            category?: string;
        }>({});

        const debouceValidateField = useCallback(
            debounce((name: string, value: string) => {
                const error = validateField(name, value);
                setErrors(prevErrors => ({
                    ...prevErrors,
                    [name]: error,
                }));
            }, 300),
            [setErrors, validateField]
        );

        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target;

            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: value,
            }));

            debouceValidateField(name, value);
        };

        const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const formToSubmit = {
                ...formData, price: parseFloat(formData.price),
                discountPercentage: parseFloat(formData.discountPercentage),
                rating: parseFloat(formData.rating),
                stock: parseInt(formData.stock),
                images: formData.images.split(',').map((img) => img.trim())
            };

            if (!validateForm(formToSubmit)) {
                return;
            }

            const submittedProduct: Omit<Product, 'id'> = formToSubmit;

            await onSubmit(submittedProduct);
            onClose();
        };

        return (
            <div
                ref={ref}
                tabIndex={-1}
                style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', width: '400px', margin: 'auto', marginTop: '50px' }}
            >
                <h2>{formTitle}</h2>
                <form onSubmit={handleSubmit}>
                    <TextField
                        required
                        name="title"
                        label="Title"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formData.title}
                        onChange={handleChange}
                        error={!!errors.title}
                        helperText={errors.title}
                    />

                    <TextField
                        required
                        name="description"
                        label="Description"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={3}
                        value={formData.description}
                        onChange={handleChange}
                        error={!!errors.description}
                        helperText={errors.description}
                    />

                    <TextField
                        required
                        name="price"
                        label="Price"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formData.price}
                        onChange={handleChange}
                        error={!!errors.price}
                        helperText={errors.price}
                        type="number"
                        InputProps={{ inputProps: { min: 0, step: "any" } }}
                    />

                    <TextField
                        required
                        name="discountPercentage"
                        label="Discount Percentage"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formData.discountPercentage}
                        onChange={handleChange}
                        error={!!errors.discountPercentage}
                        helperText={errors.discountPercentage}
                        type="number"
                        InputProps={{ inputProps: { min: 0.00, max: 100.00, step: "any" } }}
                    />

                    <TextField
                        required
                        name="rating"
                        label="Rating"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formData.rating}
                        onChange={handleChange}
                        error={!!errors.rating}
                        helperText={errors.rating}
                        type="number"
                        InputProps={{ inputProps: { min: 0, max: 5, step: "any" } }}
                    />

                    <TextField
                        required
                        name="stock"
                        label="Stock"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formData.stock}
                        onChange={handleChange}
                        error={!!errors.stock}
                        helperText={errors.stock}
                        type="number"
                        InputProps={{ inputProps: { min: 0 } }}
                    />

                    <TextField
                        required
                        name="brand"
                        label="Brand"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formData.brand}
                        onChange={handleChange}
                        error={!!errors.brand}
                        helperText={errors.brand}
                    />

                    <TextField
                        required
                        name="category"
                        label="Category"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formData.category}
                        onChange={handleChange}
                        error={!!errors.category}
                        helperText={errors.category}
                    />

                    <div style={{ display: "flex", justifyContent: "space-around", marginTop: '20px' }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Saving...' : submitButtonText}
                        </Button>
                        <Button variant="contained" onClick={onClose}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
);

export default IssueForm;
