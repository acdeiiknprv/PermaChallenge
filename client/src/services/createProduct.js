const createProduct = async (newProduct, authToken) => {
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