import { Product } from "../interfaces/product";

const createProduct = async (newProduct: Omit<Product, "id">, makeAuthenticatedRequest: (input: RequestInfo, init?: RequestInit) => Promise<Response>) => {

    if (!newProduct) return console.error('Missing new product');

    try {
        const response = await makeAuthenticatedRequest(`http://localhost:3001/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

export default createProduct;