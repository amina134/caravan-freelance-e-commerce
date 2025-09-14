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
            const item=state.items.find((i)=>i.productId._id===itemId._id)
            console.log("redux item",item)
            if(item){
                item.quantity=quantity;
            }
        },
        clearCart:(state,action)=>{
            state.items=[]
        },
        removeFromCart:(state,action)=>{
            const {itemId}=action.payload;
            state.items = state.items.filter(item => item.productId._id !== itemId);
        }
        }
    }
)
export const{setCart,updateCartItemQuantity,removeFromCart,clearCart}=cartSlice.actions
export default cartSlice.reducer;