import { Product } from "../interfaces/product";

const editProduct = async (productID: number, updatedProduct: Partial<Product>, makeAuthenticatedRequest: (input: RequestInfo, init?: RequestInit) => Promise<Response>) => {
    if (!productID) return console.error('Missing product ID');
    if (!updatedProduct) return console.error('Missing updated product');

    try {
        const id = productID.toString();
        const response = await makeAuthenticatedRequest(`http://localhost:3001/products/` + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct)
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

export default editProduct;