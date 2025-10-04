const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
   userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    unique: true, 
  },
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
      supplements: [
    {
      name: String,
      price: Number
    }
    ]
    },
  ],
  totalPrice: {
    type: Number,
    default: 0,
  },
});

<<<<<<< HEAD
module.exports = mongoose.model("cart", CartSchema);
=======
module.exports = mongoose.model("cart", CartSchema);
>>>>>>> 47cb3df (correct corrupted git files)
