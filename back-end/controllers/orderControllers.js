const orderSchema=require("../model/order")
const mongoose=require('mongoose');
require('dotenv').config()




// add orders
const addOrder = async (req, res) => {
  try {
    const newOrder = new orderSchema(req.body);
    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get all orders 
const getAllOrders = async (req, res) => {
  try {
    const orders = await orderSchema.find().sort({ createdAt: -1 });
    res.status(200).json({ msg: 'You got all the orders', orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get order by id 
const getOrderById = async (req, res) => {
  try {
    const order = await orderSchema.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// update the satus of the order
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await orderSchema.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete order
const deleteOrder = async (req, res) => {
  try {
    const order = await orderSchema.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrdersByUserId = async (req, res) => {
  try {
    const orders = await orderSchema.find({ userId: req.params.userId });
    if (!orders.length) {
      return res.status(404).json({ message: "No orders found for this user" });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports={addOrder,getAllOrders,getOrderById,updateOrderStatus,deleteOrder,getOrdersByUserId} 
