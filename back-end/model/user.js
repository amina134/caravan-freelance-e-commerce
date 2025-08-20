import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // for password hashing

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["customer", "admin"], default: "customer" },
  phone: { type: String },
  address: { type: String },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  imageUser:{type:String,}
}, { timestamps: true });



const User = mongoose.model("User", userSchema);

export default User;
