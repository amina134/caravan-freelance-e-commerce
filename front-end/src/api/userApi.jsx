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
    const updateUser = await axios.put(`http://localhost:${API_URL}/user/updateUser/${id}`, { ...values });
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
    return data;
}