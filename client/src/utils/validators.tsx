import { Product } from "../interfaces/product";

const validateTitle = (value: string) => value.length >= 3;
const validateDescription = (value: string) => value.length >= 5;
const validatePrice = (value: string) => parseFloat(value) >= 0;
const validateDiscountPercentage = (value: string) => {
    const val = parseFloat(value);
    return val >= 0 && val <= 100;
};
const validateRating = (value: string) => {
    const val = parseFloat(value);
    return val >= 0 && val <= 5;
};
const validateStock = (value: string) => parseInt(value, 10) >= 0;
const validateBrand = (value: string) => value.length >= 1;
const validateCategory = (value: string) => value.length >= 2;

export const validateForm = (formData: Omit<Product, "id">) => {
    return validateTitle(formData.title) &&
        validateDescription(formData.description) &&
        validatePrice(formData.price.toString()) &&
        validateDiscountPercentage(formData.discountPercentage.toString()) &&
        validateRating(formData.rating.toString()) &&
        validateStock(formData.stock.toString()) &&
        validateBrand(formData.brand) &&
        validateCategory(formData.category);
}

export const validateField = (name: string, value: string): string => {
    switch (name) {
        case 'title':
            return value.length >= 3 ? '' : 'Title must be at least 3 characters';
        case 'description':
            return value.length >= 10 ? '' : 'Description must be at least 10 characters';
        case 'price':
            return parseFloat(value) >= 0 ? '' : 'Price must be greater than 0';
        case 'discountPercentage':
            return parseFloat(value) >= 0 && parseFloat(value) <= 100 ? '' : 'Discount must be between 0 and 100';
        case 'rating':
            return parseFloat(value) >= 0 && parseFloat(value) <= 5 ? '' : 'Rating must be between 0 and 5';
        case 'stock':
            return parseInt(value, 10) >= 0 ? '' : 'Stock must be greater than 0';
        case 'brand':
            return value.length >= 1 ? '' : 'Brand must be at least 1 character';
        case 'category':
            return value.length >= 2 ? '' : 'Category must be at least 2 characters';
        default:
            return '';
    }
};