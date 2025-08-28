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