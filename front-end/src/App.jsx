import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {fetchAllProducts}from './api/productApi'
import { useSelector, useDispatch } from 'react-redux';
import {setProduct} from './redux/productSlice'
import Homepage from './components/frontOffice/3-main/homepage'


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
  },[products])
  return (
    <>
 
    {/* {products.map(element=>(
      <div key={element._id}>
        <h3>{element.name}</h3>
      </div>
    ))
     
    } */}
    <Homepage/>
    </>
  )
}

export default App
