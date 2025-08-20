import axios from 'axios';
const API_URL=4100
export const fetchAllProducts=async()=>{
    const{data}=await axios.get(`http://localhost:${API_URL}/product/getAllProducts`)
    console.log("data from axios",data)
    return data
}
export const postProduct=async(values)=>{
    const{data}=await axios.post(`http://localhost:${API_URL}/product/addProduct`,{...values})
 
}
export const updateProduct=async(id,values)=>{
    const{data}=await axios.put(`http://localhost:${API_URL}/product/updateProduct/${id}`,values)

}

export const deleteProduct=async(id)=>{
    const{data}=await axios.delete(`http://localhost:${API_URL}/product/addProduct/${id}`)
}

export const getUniqueProduct = async (id) => {
    const { data } = await axios.get(`http://localhost:${API_URL}/product/getProduct/${id}`);
    return data;
}