require("dotenv").config();
const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to your database: caravan");
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
    process.exit(1); // stop the server if DB fails
  }
};

module.exports = connectDb;
