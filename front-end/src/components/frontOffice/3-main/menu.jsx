
import './menu.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ListProducts from '../2-hero/listProducts';
import ProductCard from '../2-hero/cardProduct';
const Menu=()=>{
   const products=useSelector(state=>state.productElement || [])
    const dispatch=useDispatch()
  
    return(
        <div className="menu-layout">

            <div className='fliter-setup'>
<h1>hey </h1>
            </div>
          <div className='food-menu'>
        {products.map(element=>(
           <ProductCard key={element._id} {...element}/>
        )
        )}
        </div>
       
        </div>
    )
}
export default Menu