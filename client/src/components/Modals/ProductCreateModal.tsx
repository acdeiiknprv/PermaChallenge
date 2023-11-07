import { Modal } from "@mui/material";
import IssueForm from "../Product/ProductForm";
import createProduct from "../../services/createProduct";
import { Product } from "../../interfaces/product";
import { useState } from "react";
import { useAuth } from '../../AuthContext';

const ProductCreateModal = ({ open, onClose, refreshOnAction }: { open: boolean, onClose: () => void, refreshOnAction: () => void }) => {
    const { isAuthenticated, makeAuthenticatedRequest } = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    const onSave = async (newProduct: Omit<Product, 'id'>) => {
        setIsLoading(true);
        try {
            if (isAuthenticated)
                await createProduct(newProduct, makeAuthenticatedRequest);
            refreshOnAction();
        } catch (error) {
            console.error("Error while creating issue:", error);
        }
        finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <IssueForm
                onSubmit={onSave}
                onClose={onClose}
                title="Create Issue"
                submitButtonText="Create Issue"
                isLoading={isLoading}
            />
        </Modal>
    );
};
export default ProductCreateModal;