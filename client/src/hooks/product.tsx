import { useState, useEffect } from 'react';
import { getProducts, getProductsBySearch } from '../services/getProduct';
import { Product } from '../interfaces/product';

export function useProducts(searchTerm: string) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            try {
                let response;
                if (searchTerm.trim()) {
                    response = await getProductsBySearch(searchTerm);
                } else {
                    response = await getProducts();
                }
                setProducts(response.products);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
            setLoading(false);
        }

        fetchProducts();
    }, [searchTerm, refresh]);

    function handleRefresh() {
        setRefresh(prev => !prev);
    }

    return { products, loading, handleRefresh };
}
