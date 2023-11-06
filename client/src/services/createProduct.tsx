import { Product } from "../interfaces/product";
import { validateForm } from "../utils/validators";

const createProduct = async (newProduct: Omit<Product, "id">, authToken: string) => {
    if (!authToken) return console.error('Missing auth token');
    if (!newProduct) return console.error('Missing new product');

    try {
        const response = await fetch(`http://localhost:3001/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
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