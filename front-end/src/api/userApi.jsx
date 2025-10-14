import axios from 'axios';
const API_URL = 4100;

export const postUser = async (values) => {
    try {
         const res = await axios.post(`http://localhost:${API_URL}/user/signup`, { ...values });
        console.log("res",res);
        
        return res.data ;
    } catch (error) {
        throw new Error(
      error.response?.data?.error || 
      error.message || 
      'Registration failed'
    );
    }
   
}
export const postUserSignIn =async(values)=>{
    try {
          const res = await axios.post(`http://localhost:${API_URL}/user/signin`, { ...values });
        return res.data;
    } catch (error) {
         throw new Error(
      error.response?.data?.error || 
      error.message || 
      'Login failed'
    );
    }
      
}

export const updateUser = async (id, values) => {
    try {
    const res = await axios.put(`http://localhost:${API_URL}/user/updateUser/${id}`, { ...values });
    return res.data;
  } catch (err) {
    console.error("Error updating user:", err);
    throw err; 
  }
}
export const deleteUser=async(id)=>{
  try {
    const deleted=await axios.delete(`http://localhost:${API_URL}/user/deleteUser/${id}`)
  } catch (error) {
     throw err;
  }
}


export const fetchAccount = async () => {
  try {
    // Get token from storage
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    const res = await axios.get(`http://localhost:${API_URL}/user/myaccount`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error ||
        error.message ||
        "Failed to fetch account"
    );
  }
};
export const fetchAllUsers = async () => {
    const { data } = await axios.get(`http://localhost:${API_URL}/user/allUsers`);
    return data.users;
}
  export const fetchFavorites = async (userId) => {
        try {
          const res = await axios.get(`http://localhost:4100/user/getFavorites/${userId}`);
          return res.data.favorites;
        } catch (err) {
          console.error("Error fetching favorites:", err);
        }
      };

export const addFavorites = async (userId, productId) => {
  try {
    const res = await axios.post(`http://localhost:${API_URL}/user/addFavorites`, { userId, productId });
    return res.data;
  } catch (error) {
    console.error("Error adding favorite:", error);
    throw error;
  }
};

// Remove product from favorites
export const removeFavorites = async (userId, productId) => {
  try {
    const res = await axios.delete(`http://localhost:${API_URL}/user/removeFavorites`, { 
      data: { userId, productId } 
    });
    return res.data;
  } catch (error) {
    console.error("Error removing favorite:", error);
    throw error;
  }
};