import { createSlice } from '@reduxjs/toolkit'; 

const cartSlice=createSlice({
    name:'cartElement',
    initialState:{
        items:[]
        
    },
    reducers:{
        setCart:(state,action)=>{
           state.items=action.payload;
        },
        updateCartItemQuantity:(state,action)=>{
            const {itemId,quantity}=action.payload;
            const item=state.items.find((i)=>i.productId===itemId)
            if(item){
                item.quantity=quantity;
            }
        },
    }
})
export const{setCart}=cartSlice.actions
export default cartSlice.reducer;