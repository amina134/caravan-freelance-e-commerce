import axios from 'axios';
const API_URL = 4100;

/// ADDING AN ORDER
export const postOrder = async (values) => {
  try {
    const { data } = await axios.post(`http://localhost:${API_URL}/order/addOrder`, values);
    console.log("Order added:", data);
    return data;
  } catch (error) {
    console.error("Error adding order:", error);
    throw error; // Re-throw if you want to handle it elsewhere
  }
};

///GETTING ALL ORDERS
export const getAllOrders = async () => {
  try {
    const { data } = await axios.get(`http://localhost:${API_URL}/order/getAllOrders`);
    return data.orders; 
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

///GET ORDER BY ID
export const getOrderById = async (id) => {
  try {
    const { data } = await axios.get(`http://localhost:${API_URL}/order/getOrderById/${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    throw error;
  }
};

///UPDATE ORDER STATUS
export const updateOrderStatus = async (id, updatedFields) => {
  try {
    const { data } = await axios.patch(`http://localhost:${API_URL}/order/updateOrderStatus/${id}`, updatedFields);
    return data;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};
