import { Button, Modal } from "@mui/material";
import { Product } from "../../interfaces/product";
import editProduct from "../../services/editProduct";
import { useAuth } from '../../AuthContext';
import { useState } from "react";
import ProductForm from "../Product/ProductForm";

const ProductEditModal = ({ product, refreshOnAction }: { product: Product, refreshOnAction: () => void }) => {
    const { isAuthenticated, makeAuthenticatedRequest } = useAuth();

    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function getUpdatedFields(original: Product, updated: Product): Partial<Product> {
        let changes = {};

        (Object.keys(original) as Array<keyof Product>).forEach((key) => {
            if (key !== "images") {
                if (original[key] !== updated[key]) {
                    changes = { ...changes, [key]: updated[key] };
                }
            }
        })
        return changes;
    }

    const onSave = async (updatedProduct: Product) => {
        if (product.id === undefined) return;

        const updatedFields = getUpdatedFields(product, updatedProduct);
        
        setIsLoading(true);
        try {
            if (isAuthenticated) {
                await editProduct(product.id, updatedFields, makeAuthenticatedRequest);
                refreshOnAction();
            }
        } catch (error) {
            console.error("Error while editing product:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Button variant="contained" color="primary" onClick={handleShow}>
                Edit Product
            </Button>

            <Modal open={show} onClose={handleClose}>
                <ProductForm
                    product={product}
                    onSubmit={onSave}
                    onClose={handleClose}
                    title="Edit Product"
                    submitButtonText="Save Changes"
                    isLoading={isLoading}
                />
            </Modal>
        </>
    );
};
export default ProductEditModal;
