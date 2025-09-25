const mongoose=require('mongoose');
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
 // category: { type: String, enum: ["food", "drink", "dessert"], required: true },
  image: { type: String }, // path to image
  isAvailable: { type: Boolean, default: true },
 category: { 
    type: String, 
    enum: ['Pizza', 'Poutine', 'Hot Dog', 'Burger'], 
    required: true 
  },
  soldCount: { type: Number, default: 0 },
  stock: { type: Number, default: 5 },
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      rating: { type: Number, required: true, min: 1, max: 5 },
      comment: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
    }
  ],
  averageRating: { type: Number, default: 0 },
  supplements: [
    {
      name: { type: String, required: true },
      price: { type: Number, default: 0 },
      isAvailable: { type: Boolean, default: true }
    }
  ]
}, { timestamps: true });

const Product = mongoose.model("product", productSchema);

module.exports=Product