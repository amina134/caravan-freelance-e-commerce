const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city:{type:String, required :true},
  notes: { type: String }, // optional
  cartItems: [
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },

    supplements: [
      { name: String, price: Number }
    ]
  }
  ]
    ,
  paymentMethod: { type: String, default: "Pay on Delivery" },
  status: {
  type: String,
  enum: ["Pending", "Preparing", "On the way", "Delivered", "Cancelled"],
  default: "Pending"
  },
  // totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});



module.exports = mongoose.model("order", orderSchema);
