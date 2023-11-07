import { useState } from 'react';
import { useAuth } from '../AuthContext';

import { Product } from '../interfaces/product';

import NoProducts from '../utils/noproduct';
import { LoginModal } from './Login/LoginModal';
import { LogoutModal } from './Login/LogoutModal';
import SearchModal from './Modals/ProductSearchModal';
import ProductsActions from './Product/ProductActions';
import ProductCreateModal from './Modals/ProductCreateModal';

import { useProducts } from '../hooks/product';
import { useCreateModal, useLoginModal, useLogoutModal, useSearchModal } from '../hooks/modal';

import { Box, Typography } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { FixedButton } from './Buttons/FixedButton';

import AddIcon from '@mui/icons-material/Add';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';

function Products() {
    const { isAuthenticated } = useAuth();

    const [filter, setFilterTerm] = useState<string>("");
    const [search, setSearchTerm] = useState<string>("");
    const [searchMode, setSearchMode] = useState<boolean>(false);

    const { showCreateModal, handleShowModal, handleCloseModal } = useCreateModal();
    const { showLoginModal, handleShowLoginModal, handleCloseLoginModal } = useLoginModal();
    const { showLogoutModal, handleShowLogoutModal, handleCloseLogoutModal } = useLogoutModal();
    const { showSearchModal, handleShowSearchModal, handleCloseSearchModal } = useSearchModal();

    const { products, handleRefresh, loading } = useProducts(search);


    const handleSearch = (tempSearchTerm: string) => {
        setSearchTerm(tempSearchTerm);
        setSearchMode(true);
    }

    const handleSearchOff = () => {
        setSearchTerm("");
        setSearchMode(false);
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Filter by name..."
                value={filter}
                onChange={(e) => setFilterTerm(e.target.value)}
            />


            {loading ? <CircularProgress /> :
                <ProductsList products={products} onAction={handleRefresh} search={filter} />
            }

            <> {/* Buttons */}
                {isAuthenticated ? (
                    <>
                        <FixedButton icon={<AddIcon />} onClick={handleShowModal} bottom={'20px'} right={'100px'} />
                        <FixedButton icon={<LogoutIcon />} onClick={handleShowLogoutModal} bottom={'20px'} right={'20px'} />
                    </>
                ) : <FixedButton icon={<LoginIcon />} onClick={handleShowLoginModal} bottom={'20px'} right={'20px'} />}
                {searchMode ? <FixedButton icon={<SearchOffIcon />} onClick={handleSearchOff} bottom={'100px'} right={'20px'} /> : <FixedButton icon={<SearchIcon />} onClick={handleShowSearchModal} bottom={'100px'} right={'20px'} />}
            </>

            <> {/* Modals */}
                {showCreateModal ? <ProductCreateModal open={showCreateModal} onClose={handleCloseModal} refreshOnAction={handleRefresh} /> : null}
                {showLoginModal ? <LoginModal open={showLoginModal} onClose={handleCloseLoginModal} /> : null}
                {showLogoutModal ? <LogoutModal open={showLogoutModal} onClose={handleCloseLogoutModal} /> : null}
                {showSearchModal ? <SearchModal open={showSearchModal} onClose={handleCloseSearchModal} onSearch={handleSearch} /> : null}
            </>
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

export default Products;
