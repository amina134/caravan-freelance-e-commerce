import axios from 'axios';
const BASE_URL = 'http://localhost:4100/cart';




// get cart by user id
export const getCartByUserId=async(userId)=>{
    try {
        const response =await axios.get(`${BASE_URL}/getCart/${userId}`)
        return response.data;
    } catch (error) {
        console.error('error fetching cart',error);
        throw error;
    }

};

// Add item to cart
export const addItemToCart = async (userId, productId, quantity) => {
    try {
        const response = await axios.post(`${BASE_URL}/addCart/${userId}`, { productId, quantity });
        return response.data;
    } catch (error) {
        console.error('Error adding item to cart:', error);
        throw error;
    }
};

// Remo ve item from cart
export const removeItemFromCart = async (userId,productId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/removeCart/${userId}/${productId._id}`);
        console.log("item to be be removed",productId._id)
        return response.data;
    } catch (error) {
        console.error('Error removing item from cart:', error);
        throw error;
    }
};

// Clear cart
export const clearCartApi = async (userId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/clearCart/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error clearing cart:', error);
        throw error;
    }
};

export const updateQuantityApi = async (userId, productId, newQuantity) => {
    try {
        const response = await axios.put(
            `${BASE_URL}/updateQuantity/${userId}/${productId}`,
            { newQuantity: Number(newQuantity) } // Ensure number type
        );
        return response.data.updatedItem; // Return only updated item
    } catch (error) {
        console.error("Error updating quantity:", error);
        throw error;
    }
};
