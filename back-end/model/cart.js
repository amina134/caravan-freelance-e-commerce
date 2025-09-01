const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product", 
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
      },
    },
  ],
  totalPrice: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("cart", CartSchema);
