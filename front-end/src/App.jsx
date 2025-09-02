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
       
      <Route path='/' element={<Homepage/>}/>
      <Route path='/Menu' element={<Menu/>}/>
      <Route path="/ProductInformation/:id" element={<ProductInformation/>}/>


      <Route path='/userZone' element={<UserZone/>}/>
    </Routes>
   
    </>
  )
}

export default App
