import PropTypes from "prop-types";
import IssueEditModal from "../Modals/ProductEditModal";
import { Product } from "../../interfaces/product";
import { useAuth } from '../../AuthContext';

const ProductsActions = ({ product, onAction }: { product: Product, onAction: () => void }) => {
    const { isAuthenticated } = useAuth();
    if (product.id === undefined || !isAuthenticated) return (<></>);
    return (
        <div>
            {<IssueEditModal product={product} refreshOnAction={onAction} />}
        </div>
    );
};

ProductsActions.propTypes = {
    product: PropTypes.object.isRequired,
};

export default ProductsActions;
