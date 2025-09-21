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
    addToCart: (state, action) => {
        const { product, quantity, supplements } = action.payload;

        // Check if the product already exists with the same supplements
        const existingItem = state.items.find(item => {
    const itemSupplementsIds = (item.supplements || []).map(s => s._id.toString()).sort();
    const newSupplementsIds = (supplements || []).map(s => s._id.toString()).sort();
  console.log("prodct slice ",product)
    return (
        item.productId._id.toString() === product._id &&
        JSON.stringify(itemSupplementsIds) === JSON.stringify(newSupplementsIds)
    );
  });

        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          console.log("proddddduct to add ",product)
          state.items.unshift({
            productId: product,
            quantity,
            supplements: supplements || [],
          });
        }
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
              state.items = state.items.filter(item => item._id !== itemId);
          }
          }
      }
  )
  export const{setCart,updateCartItemQuantity,removeFromCart,clearCart,addToCart}=cartSlice.actions
  export default cartSlice.reducer;