import PropTypes from "prop-types";
import IssueEditModal from "./ProductEditModal";
import { Product } from "../../interfaces/product";
import { useAuth }  from '../../AuthContext';

const ProductsActions = ({ product, onAction }: {product: Product, onAction: () => void}) => {
    const { authToken } = useAuth();
    if (product.id === undefined || authToken == null) return (<></>);
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
