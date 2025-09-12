import {configureStore} from "@reduxjs/toolkit";
import productSlice from './productSlice';
import userSlice from'./userSlice'
import cartSlice from'./cartSlice'
export default configureStore({
    reducer:{
        productElement:productSlice,
        userElement:userSlice,

        cartElement:cartSlice,
    },
}) 