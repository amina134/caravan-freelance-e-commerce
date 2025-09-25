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

///// fir the reviews////
// Add a review to a product
const addReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, rating, comment } = req.body;

        // Find product
        const product = await productSchema.findById(id);
        if (!product) return res.status(404).json({ msg: 'Product not found' });

      
        const existingReview = product.reviews.find(r => r.user.toString() === userId);
        if (existingReview) {
            return res.status(400).json({ msg: 'You have already reviewed this product' });
        }

        // Add review
        product.reviews.push({ user: userId, rating, comment });

        // Update average rating
        product.averageRating = product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length;

        await product.save();
        
        res.status(201).json({ msg: 'Review added', reviews: product.reviews, averageRating: product.averageRating });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Get all reviews of a product
const getReviews = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productSchema.findById(id).populate('reviews.user', 'userName email'); // populate user info
        if (!product) return res.status(404).json({ msg: 'Product not found' });

        res.json({ reviews: product.reviews, averageRating: product.averageRating });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Optional: Delete a review
const deleteReview = async (req, res) => {
    try {
        const { id, reviewId } = req.params;
        const product = await productSchema.findById(id);
        if (!product) return res.status(404).json({ msg: 'Product not found' });

        product.reviews = product.reviews.filter(r => r._id.toString() !== reviewId);
        product.averageRating = product.reviews.length
            ? product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length
            : 0;

        await product.save();
        res.json({ msg: 'Review deleted', reviews: product.reviews, averageRating: product.averageRating });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};
module.exports={getProduct,addProduct,updateProduct,deleteProduct,getAllProducts,deleteReview,addReview,getReviews}