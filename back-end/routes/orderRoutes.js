const express=require('express')
const orderRoute=express.Router()
const {addOrder,getAllOrders,getOrderById,updateOrderStatus,deleteOrder,getOrdersByUserId}=require('../controllers/orderControllers')

// http://localhost:4100/order/addOrder
orderRoute.post('/addOrder',addOrder)

// http://localhost:4100/order/getAllOrders
orderRoute.get('/getAllOrders',getAllOrders)

// http://localhost:4100/order/getOrder/:id
orderRoute.get('/getOrder/:id',getOrderById)

// http://localhost:4100/order/updateOrderStatus/:id
orderRoute.put('/updateOrderStatus/:id',updateOrderStatus)


// http://localhost:4100/order/deleteOrder/:id
orderRoute.delete('/deleteOrder/:id',deleteOrder)

// http://localhost:4100/order/getOrdersByUserId/:id
orderRoute.get('/getOrdersByUserId/:id',getOrdersByUserId)

module.exports=orderRoute