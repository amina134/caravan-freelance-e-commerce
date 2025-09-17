require("dotenv").config();
const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Database connection error:", error.message);
        process.exit(1);
    }
};

module.exports = connectDb;