import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {fetchAllProducts}from './api/productApi'
import { useSelector, useDispatch } from 'react-redux';
import {setProduct} from './redux/productSlice'

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
    <h1>heyyy</h1>
    {/* {products.map(element=>(
      <div key={element._id}>
        <h3>{element.name}</h3>
      </div>
    ))
     
    } */}
    </>
  )
}

export default App
