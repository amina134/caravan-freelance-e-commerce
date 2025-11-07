const orderSchema = require("../model/order");
const mongoose = require("mongoose");
require("dotenv").config();

// Add order
const addOrder = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Check if the user already has an active order
    const activeOrder = await orderSchema.findOne({
      userId,
      status: { $in: ["Pending", "Preparing", "On the way"] },
    });

    if (activeOrder) {
      return res.status(400).json({
        message:
          "You already have an active order. Please wait until it is delivered or cancelled before placing a new one.",
      });
    }

    // Create new order
    const newOrder = new orderSchema(req.body);
    await newOrder.save();

     const populatedOrder = await newOrder.populate({
      path: "cartItems.productId",
      select: "name price image",
     
    });

    return res
      .status(201)
      .json({ message: "Order placed successfully", order: populatedOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res
      .status(500)
      .json({ message: "Failed to place order", error: error.message });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await orderSchema
      .find()
       
      .populate("cartItems.productId") // populate product details if exists
      .sort({ createdAt: -1 });

    res.status(200).json({ msg: "You got all the orders", orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await orderSchema
      .findById(req.params.id)
      
      .populate("cartItems.productId");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await orderSchema
      .findByIdAndUpdate(req.params.id, { status }, { new: true })
      .populate("userId")
      .populate("cartItems.productId");

    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete order
const deleteOrder = async (req, res) => {
  try {
    const order = await orderSchema.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get orders by user ID
const getOrdersByUserId = async (req, res) => {
  try {
    const orders = await orderSchema
      .find({ userId: req.params.userId })
      
      .populate("cartItems.productId")
     

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found for this user" });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  getOrdersByUserId,
};
