import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'

import './App.css'
import {fetchAllProducts}from './api/productApi'
import { useSelector, useDispatch } from 'react-redux';
import {setProduct} from './redux/productSlice'
import Homepage from './components/frontOffice/3-main/homepage'




import { Routes, Route,useLocation } from "react-router-dom";
import Menu from './components/frontOffice/3-main/menu';
import Navbar from './components/frontOffice/1-header/navbar';
import ProductInformation from './components/frontOffice/3-main/productInformation';
import UserZone from './components/backOffice/user/userZone';
import CartPage from './components/frontOffice/3-main/cartPage';
import Favourites from './components/frontOffice/3-main/favourites';
import Profile from './components/frontOffice/3-main/profile';
import About from './components/frontOffice/4-contact/about';
import Contact from './components/frontOffice/4-contact/contact';
import Footer from './components/frontOffice/5-footer/footer';


import AdminDashboard from './components/backOffice/admin/adminDashboard';
function App() {

  const products=useSelector(state=>state.productElement)
  const dispatch=useDispatch()
  const location = useLocation();
  //getinng the books from database using axios
  const getAllProducts=async()=>{
    const data=await fetchAllProducts();
    console.log("productss",data)
    dispatch(setProduct(data.products))
  }


   const hideLayout = location.pathname.startsWith("/Admindashboard");
  useEffect(()=>{
     getAllProducts()
  },[])
  return (
   
   
 
    <>

    {! hideLayout && <Navbar/>}
    <Routes> 
      <Route path="/" element={<Homepage/>}/>
      <Route path='/Home' element={<Homepage/>}/>
      <Route path='/Menu' element={<Menu/>}/>

      <Route path="/ProductInformation/:id" element={<ProductInformation/>}/>
      <Route path="/About-us" element={<About/>}/>
      <Route path="/Contact" element={<Contact/>}/>

      <Route path='/userZone' element={<UserZone/>}>
         

        <Route index   element={<Homepage/>}/>
        <Route path='Menu' element={<Menu/>}/>
        <Route path="ProductInformation/:id" element={<ProductInformation/>}/>
        <Route path='cart' element={<CartPage/>}/>
        <Route path='favourites' element={<Favourites/>}/>
        <Route path='profile' element={<Profile/>}/>
        <Route path="About-us" element={<About/>}/>
        <Route path="Contact" element={<Contact/>}/>
        
      </Route>    
   
       <Route path="/Admindashboard" element={<AdminDashboard/>}>
      </Route> 
    </Routes>
      {! hideLayout && <Footer/>}
   
    </>
  )
}

export default App

