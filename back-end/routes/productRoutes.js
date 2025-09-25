const express=require('express')
const productRoute=express.Router()
const {addProduct,getProduct,updateProduct,deleteProduct,getAllProducts,addReview,getReviews,deleteReview}=require('../controllers/productControllers')
// http://localhost:4100/product/addProduct
productRoute.post('/addProduct',addProduct)

// http://localhost:4100/product/getProduct/:id
productRoute.get('/getProduct/:id',getProduct)

// http://localhost:4100/product/updateProduct/:id
productRoute.put('/updateProduct/:id',updateProduct)

// http://localhost:4100/product/deleteProduct/:id
productRoute.delete('/deleteProduct/:id',deleteProduct)

// http://localhost:4100/product/getAllProducts
productRoute.get('/getAllProducts',getAllProducts)

// http://localhost:4100/product/addReview/:id
productRoute.post('/addReview/:id', addReview);

// http://localhost:4100/product/getReviews/:productId
productRoute.get('/getReviews/:id', getReviews);

// http://localhost:4100/product/deleteReview/:id/:reviewId
productRoute.delete('/deleteReview/:id/:reviewId', deleteReview);
module.exports=productRoute

