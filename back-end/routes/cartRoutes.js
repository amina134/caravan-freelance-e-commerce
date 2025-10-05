const{ getCartByUserId, addItemToCart, removeItemFromCart, clearCart,updateQuantityItemCart}=require('../controllers/cartControllers');


const  express=require('express');
const cartRoute=express.Router();
cartRoute.use(express.json());
//http://localhost:4100/cart/getCart/:userId
cartRoute.get('/getCart/:userId', getCartByUserId);

//http://localhost:4100/cart/addCart/:userId
cartRoute.post('/addCart/:userId', addItemToCart);

//http://localhost:4100/cart/removeCart/:userId/:productId
cartRoute.delete('/removeCart/:userId/:productId', removeItemFromCart);

//http://localhost:4100/cart/ClearCart/:userId
cartRoute.delete('/clearCart/:userId', clearCart);

//http://localhost:4100/cart/updateQuantity/:userId/:productId
cartRoute.put('/updateQuantity/:userId/:productId',updateQuantityItemCart)




module.exports = cartRoute;
