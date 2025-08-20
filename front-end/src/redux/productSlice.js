import {createSlice} from '@reduxjs/toolkit';
const productSlice=createSlice({
    name:"productElement",
    initialState:[{
        _id:"1",
        name:"product name",
        description:"descrpition of the food",
        price:12,
        image:"path of image",
        isavailble:true,
        supplements:["mayonnaise",2,true],

    }],
    reducers:{
        setProduct:(state,action)=>{
            return action.payload
        }
    }
})
export const{setProduct}=productSlice.actions;
export default productSlice.reducer;