import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'

import './App.css'
import {fetchAllProducts}from './api/productApi'
import { useSelector, useDispatch } from 'react-redux';
import {setProduct} from './redux/productSlice'
import Homepage from './components/frontOffice/3-main/homepage'

import { Routes, Route } from "react-router-dom";
import Menu from './components/frontOffice/3-main/menu';
import Navbar from './components/frontOffice/1-header/navbar';
import ProductInformation from './components/frontOffice/3-main/productInformation';
import UserZone from './components/backOffice/user/userZone';
import CartPage from './components/frontOffice/3-main/cartPage';
import Favourites from './components/frontOffice/3-main/favourites';
import Profile from './components/frontOffice/3-main/profile';
function App() {

  const products=useSelector(state=>state.productElement)
  const dispatch=useDispatch()
  //getinng the books from database using axios
  const getAllProducts=async()=>{
    const data=await fetchAllProducts();
    console.log("productss",data)
    dispatch(setProduct(data.products))
  }
  useEffect(()=>{
     getAllProducts()
  },[])
  return (
   
 
 
    <>
    <Navbar/>
    <Routes> 
      <Route path="/" element={<Homepage/>}/>
      <Route path='/Home' element={<Homepage/>}/>
      <Route path='/Menu' element={<Menu/>}/>

      <Route path="/ProductInformation/:id" element={<ProductInformation/>}/>


      <Route path='/userZone' element={<UserZone/>}>
         

        <Route index   element={<Homepage/>}/>
        <Route path='Menu' element={<Menu/>}/>
        <Route path="ProductInformation/:id" element={<ProductInformation/>}/>
        <Route path='cart' element={<CartPage/>}/>
        <Route path='favourites' element={<Favourites/>}/>
        <Route path='profile' element={<Profile/>}/>
      </Route>
    </Routes>
   
    </>
  )
}

export default App
