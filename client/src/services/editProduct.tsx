import { Product } from "../interfaces/product";

const editIssue = async (productID:number, updatedProduct: Omit<Product, 'id'>, authToken: string) => {
    try {
        const id = productID.toString();
        const response = await fetch(`http://localhost:3001/products/` + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify(updatedProduct)
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

export default editIssue;