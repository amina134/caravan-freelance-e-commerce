import axios from 'axios';
const API_URL = 4100;

/// ADDING AN ORDER
export const postOrder = async (values) => {
  try {
    const { data } = await axios.post(`http://localhost:${API_URL}/order/addOrder`, {...values});
    console.log("Order added:", data.order);
    return data;
  } catch (error) {
    throw error.response?.data?.message || "Something went wrong";
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

// ///UPDATE ORDER STATUS
// export const updateOrderStatus = async (id, updatedStatus) => {
//   try {
//     const { data } = await axios.patch(`http://localhost:${API_URL}/order/updateOrderStatus/${id}`, updatedFields);
//     return data;
//   } catch (error) {
//     console.error("Error updating order status:", error);
//     throw error;
//   }
// };

export const getOrdersByUserId=async(userId)=>{
  try{
    const {data}=await axios.get(`http://localhost:${API_URL}/order/getOrdersByUserId/${userId}`)
    return data;
  }
  catch(error){
     console.error("Error fetching orders by userID:", error);
     throw error;
  }
}