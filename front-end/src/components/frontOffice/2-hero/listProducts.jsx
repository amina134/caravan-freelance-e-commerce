
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from './cardProduct';


const ListProducts=()=>{
    // get the Proudcts from redux
  
    const products=useSelector(state=>state.productElement || [])
    const dispatch=useDispatch()
  
   
    return (
        <div>
        {products.map(element=>(
           <ProductCard key={element._id} {...element}/>
        )
        )}
        </div>
    )
}
export default ListProducts