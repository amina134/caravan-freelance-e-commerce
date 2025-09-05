import {configureStore} from "@reduxjs/toolkit";


import productSlice from './productSlice';
import userSlice from'./userSlice'

export default configureStore({
    reducer:{
        productElement:productSlice,
        userElement:userSlice,
    },
})