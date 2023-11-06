import { useState, useEffect } from 'react';
import { getProducts } from '../services/getProduct';
import { Product } from '../interfaces/product';

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            const response = await getProducts();
            if (response)
                setProducts(response.products);
            setLoading(false);
        }
        fetchProducts();
    }, [refresh]);

    function handleRefresh() {
        setRefresh(prev => !prev);
    }

    return { products, handleRefresh, loading };
}

