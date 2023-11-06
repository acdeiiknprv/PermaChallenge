import { useState } from "react";
import { Product } from "../../interfaces/product";
import { Button, TextField } from "@mui/material";
import React from "react";

interface IssueFormProps {
    product?: Product;
    onSubmit: (product: Omit<Product, 'id'>) => Promise<void>;
    onClose: () => void;
    title: string;
    submitButtonText: string;
    isLoading?: boolean;
}

const IssueForm = React.forwardRef<HTMLDivElement, IssueFormProps>(
    ({ product, onSubmit, onClose, title: formTitle, submitButtonText, isLoading }, ref) => {
        const [title, setTitle] = useState(product ? product.title : "");
        const [description, setDescription] = useState(product ? product.description : "");
        const [price, setPrice] = useState(product ? product.price.toString() : "");
        const [discountPercentage, setDiscountPercentage] = useState(product ? product.discountPercentage.toString() : "");
        const [rating, setRating] = useState(product ? product.rating.toString() : "");
        const [stock, setStock] = useState(product ? product.stock.toString() : "");
        const [brand, setBrand] = useState(product ? product.brand : "");
        const [category, setCategory] = useState(product ? product.category : "");
        const [thumbnail, setThumbnail] = useState(product ? product.thumbnail : "");
        const [images, setImages] = useState(product ? product.images.join(', ') : "");

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
        

        const validateTitle = (value: string) => value.length >= 3;
        const validateDescription = (value: string) => value.length >= 5;
        const validatePrice = (value: string) => parseFloat(value) >= 0;
        const validateDiscountPercentage = (value: string) => {
            const val = parseFloat(value);
            return val >= 0 && val <= 100;
        };
        const validateRating = (value: string) => {
            const val = parseFloat(value);
            return val >= 0 && val <= 5;
        };
        const validateStock = (value: string) => parseInt(value, 10) >= 0;
        const validateBrand = (value: string) => value.length >= 1;
        const validateCategory = (value: string) => value.length >= 2;

        const isFormValid = () => {
            return (
                validateTitle(title) &&
                validateDescription(description) &&
                validatePrice(price) &&
                validateDiscountPercentage(discountPercentage) &&
                validateRating(rating) &&
                validateStock(stock) &&
                validateBrand(brand) &&
                validateCategory(category)
            );
        };

        const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (!isFormValid()) {
                return;
            }

            const submittedProduct: Omit<Product, 'id'> = {
                title,
                description,
                price: parseFloat(price),
                discountPercentage: parseFloat(discountPercentage),
                rating: parseFloat(rating),
                stock: parseInt(stock, 10),
                brand,
                category,
                thumbnail,
                images: images.split(',').map((img) => img.trim()),
            };
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
                        label="Title"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={title}
                        onChange={(event) => {
                            const newValue = event.target.value;
                            setTitle(newValue);
                            setErrors({
                                ...errors,
                                title: newValue.length >= 3 ? '' : 'Title must be at least 3 characters',
                            });
                        }}
                        error={!!errors.title}
                        helperText={errors.title}
                    />

                    <TextField
                        required
                        label="Description"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={3}
                        value={description}
                        onChange={(event) => {
                            const newValue = event.target.value;
                            setDescription(newValue);
                            setErrors({
                                ...errors,
                                description: newValue.length >= 5 ? '' : 'Description must be at least 5 characters',
                            });
                        }}
                        error={!!errors.description}
                        helperText={errors.description}
                    />

                    <TextField
                        required
                        label="Price"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={price}
                        onChange={(event) => {
                            const newValue = event.target.value;
                            setPrice(newValue);
                            const numericValue = parseFloat(newValue);
                            setErrors({
                                ...errors,
                                price: !isNaN(numericValue) && numericValue >= 0 ? '' : 'Price cannot be less than 0',
                            });
                        }}
                        error={!!errors.price}
                        helperText={errors.price}
                        type="number"
                    />

                    <TextField
                        required
                        label="Discount Percentage"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={discountPercentage}
                        onChange={(event) => {
                            const newValue = event.target.value;
                            setDiscountPercentage(newValue);
                            const numericValue = parseFloat(newValue);
                            setErrors({
                                ...errors,
                                discountPercentage: !isNaN(numericValue) && numericValue >= 0 && numericValue <= 100 ? '' : 'Discount percentage must be between 0 and 100',
                            });
                        }}
                        error={!!errors.discountPercentage}
                        helperText={errors.discountPercentage}
                        type="number"
                    />

                    <TextField
                        required
                        label="Rating"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={rating}
                        onChange={(event) => {
                            const newValue = event.target.value;
                            setRating(newValue);
                            const numericValue = parseFloat(newValue);
                            setErrors({
                                ...errors,
                                rating: !isNaN(numericValue) && numericValue >= 0 && numericValue <= 5 ? '' : 'Rating must be between 0 and 5',
                            });
                        }}
                        error={!!errors.rating}
                        helperText={errors.rating}
                        type="number"
                    />

                    <TextField
                        required
                        label="Stock"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={stock}
                        onChange={(event) => {
                            const newValue = event.target.value;
                            setStock(newValue);
                            const numericValue = parseInt(newValue, 10);
                            setErrors({
                                ...errors,
                                stock: !isNaN(numericValue) && numericValue >= 0 ? '' : 'Stock cannot be less than 0',
                            });
                        }}
                        error={!!errors.stock}
                        helperText={errors.stock}
                        type="number"
                    />

                    <TextField
                        required
                        label="Brand"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={brand}
                        onChange={(event) => {
                            const newValue = event.target.value;
                            setBrand(newValue);
                            setErrors({
                                ...errors,
                                brand: newValue.length >= 1 ? '' : 'Brand should be at least 1 character',
                            });
                        }}
                        error={!!errors.brand}
                        helperText={errors.brand}
                    />

                    <TextField
                        required
                        label="Category"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={category}
                        onChange={(event) => {
                            const newValue = event.target.value;
                            setCategory(newValue);
                            setErrors({
                                ...errors,
                                category: newValue.length >= 2 ? '' : 'Category should be at least 2 characters',
                            });
                        }}
                        error={!!errors.category}
                        helperText={errors.category}
                    />

                    <div style={{ display: "flex", justifyContent: "space-around", marginTop: '20px' }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isLoading}  // Disable the button if loading
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
