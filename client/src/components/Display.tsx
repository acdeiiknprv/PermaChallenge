import React, { useState } from 'react';
import ProductsActions from './Product/ProductActions';
import IssueCreateModal from './Product/ProductCreateModal';

import { useProducts } from '../hooks/product';
import { useCreateModal, useLoginModal } from '../hooks/modal';
import { Product } from '../interfaces/product';

import AddIcon from '@mui/icons-material/Add';
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { useAuth }  from '../AuthContext';
import { LoginModal } from './Login/LoginModal';

function FormatProduct() {
    const { authToken } = useAuth();

    const { products, handleRefresh, loading } = useProducts();
    const { showCreateModal, handleShowModal, handleCloseModal } = useCreateModal();
    const { showLoginModal, handleShowLoginModal, handleCloseLoginModal} = useLoginModal();
    const [searchTerm, setSearchTerm] = useState<string>("");

    return (
        <div>
            <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            { authToken ? <AddButton icon={<AddIcon />} onClick={handleShowModal} /> : <AddButton icon={<LoginIcon />} onClick={handleShowLoginModal} /> }

            {loading ? <CircularProgress /> :
                <ProductsList products={products} onAction={handleRefresh} search={searchTerm} />
            }
            {showCreateModal ? <IssueCreateModal open={showCreateModal} onClose={handleCloseModal} refreshOnAction={handleRefresh} /> : null}
            { showLoginModal ? <LoginModal open={showLoginModal} onClose={handleCloseLoginModal} /> : null}
        </div>
    );
}

function ProductsList({ products, onAction, search }: { products: Product[], onAction: () => void, search: string }) {
    if (!Array.isArray(products)) {
        console.error('Products is not an array', products);
        return <div>Error: Products data is invalid.</div>;
    }

    if (search.length > 0) {
        products = products.filter(product => product.title.toLowerCase().includes(search.toLowerCase()));
    }

    if (products.length === 0) {
        return <NoProducts />;
    }
    return (
        <div>
            {products.map(product => (
                <ProductDisplay key={product.id} product={product} onAction={onAction} />
            ))}
        </div>
    );
}

function AddButton({ icon, onClick }: { icon: React.ReactNode, onClick: () => void }) {
    return (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
            <Button variant="contained" color="primary"
                style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    minWidth: 'unset',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onClick={onClick}
            >
                {icon}
            </Button>
        </div>
    );
}

function NoProducts() {
    return <h3>No products</h3>;
}

function ProductDisplay({ product, onAction }: { product: Product, onAction: () => void }) {
    return (
      <Box className='product-container' sx={{ marginBottom: 2, padding: 2, border: '1px solid lightgray', borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h6" component="div">{product.title}</Typography>
        </Box>
        <Typography variant="subtitle1" component="div">{product.description}</Typography>
        <Typography variant="subtitle1" component="div">Price: ${product.price.toFixed(2)}</Typography>
        <Typography variant="subtitle1" component="div">Discount: {product.discountPercentage.toFixed(2)}%</Typography>
        <Typography variant="subtitle1" component="div">Rating: {product.rating}</Typography>
        <Typography variant="subtitle1" component="div">Stock: {product.stock}</Typography>
        <Typography variant="subtitle1" component="div">Brand: {product.brand}</Typography>
        <Typography variant="subtitle1" component="div">Category: {product.category}</Typography>

        <ProductsActions product={product} onAction={onAction} />
      </Box>
    );
  }

export default FormatProduct;
