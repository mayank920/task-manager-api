const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

async function testDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connection successful!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
}

testDB();
