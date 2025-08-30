const productSchema=require('../model/product')
const mongoose=require('mongoose');
require('dotenv').config()

// this function add a product to our database
const addProduct=async(req,res)=>{
    try{
        const newProduct=new productSchema(req.body)
        console.log('New Product added',req.body);
        await newProduct.save()
        res.status(200).json({ msg: 'you added new product', newProduct});

        
    } catch(error){
        console.log(error);
        res.send('you have a problem when adding the product')

        
    }
}

// this function get a product from our database by id
const getProduct=async(req,res)=>{
    try{
      const product=await productSchema.findById(req.params.id);
      if(product){
        res.status(200).json({message:'product gotten succesfully',product})

      }
    }catch(error){
        res.status(404).json({message:"product not found"}) 
    }
}
//this function updates a product
const updateProduct=async(req,res)=>{
    try{
        const productId=req.params.id.trim()
        const updatedProduct=await productSchema.findByIdAndUpdate(productId,req.body)

    if (updatedProduct){
            res.status(200).json({msg:'PRODUCT updated ',updatedProduct})}
    } catch (error) {
        res.status(404).json({message:"product not updated"}) 
    }
}


//this function deleted a Product
const deleteProduct=async(req,res)=>{
    try {
          
        const productId=req.params.id
        console.log("id ",productId)
        const deletedProduct= await productSchema.findByIdAndDelete(productId,req.body)
      
        if (deletedProduct){
            res.status(200).json({msg:'deleted product successufully',deletedProduct})
        }
    } catch (error) {
        res.status(404).json({message:"product not deleted"}) 
    }
    
}
// get all books
const getAllProducts=async(req,res)=>{
    try{
        const products=await productSchema.find()
        res.status(200).json({ msg: 'You got all the products', products });
    } catch (error) {
        console.error("mission failed")
        res.status(404).send('An error occurred while fetching products');
    }
}


module.exports={getProduct,addProduct,updateProduct,deleteProduct,getAllProducts}