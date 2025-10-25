const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  notes: { type: String }, // optional
  cartItems: [
    {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    name: String,
    quantity: Number,
    price: Number,
    supplements: [
      {
        name: String,
        price: Number,
      }
    ]
    }
    ]
    ,
  paymentMethod: { type: String, default: "Pay on Delivery" },
  status: { type: String, default: "Pending" }, // Pending, Preparing, On the way, Delivered
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});



module.exports = mongoose.model("Order", orderSchema);
