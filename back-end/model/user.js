const mongoose=require('mongoose')


const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["customer", "admin"], default: "customer" },
  phone: { type: String },
  address: { type: String },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
  imageUser:{type:String,}
}, { timestamps: true });



const User = mongoose.model("user", userSchema);

module.exports=User
