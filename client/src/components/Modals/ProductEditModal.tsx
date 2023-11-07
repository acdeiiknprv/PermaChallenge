import { Button, Modal } from "@mui/material";
import { Product } from "../../interfaces/product";
import editProduct from "../../services/editProduct";
import { useAuth } from '../../AuthContext';
import { useState } from "react";
import IssueForm from "../Product/ProductForm";

const ProductEditModal = ({ product, refreshOnAction }: { product: Product, refreshOnAction: () => void }) => {
    const { isAuthenticated, makeAuthenticatedRequest } = useAuth();

    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onSave = async (updatedProduct: Omit<Product, 'id'>) => {
        if (product.id === undefined) return;
        setIsLoading(true);
        try {
            if (isAuthenticated) {
                await editProduct(product.id, updatedProduct, makeAuthenticatedRequest);
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
                <IssueForm
                    product={product}
                    onSubmit={onSave}
                    onClose={handleClose}
                    title="Edit Issue"
                    submitButtonText="Save Changes"
                    isLoading={isLoading}
                />
            </Modal>
        </>
    );
};
export default ProductEditModal;
