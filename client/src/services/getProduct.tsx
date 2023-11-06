export async function getProducts() {
    try {
        const response = await fetch('http://localhost:3001/products');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function getProductById(productID: string) {
    if (!productID) {
        throw new Error('Product ID is required');
    }
    try {
        const response = await fetch(`http://localhost:3001/products/${productID}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function getProductsBySearch(searchTerm: string) {
    if (!searchTerm) {
        throw new Error('Search term is required');
    }
    try {
        const response = await fetch(`http://localhost:3001/products/search?q=${searchTerm}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}