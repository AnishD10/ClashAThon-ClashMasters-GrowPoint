const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

/**
 * Connect to MongoDB Database
 * WHY: Establishes connection to MongoDB for data persistence
 */
const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGODB_URI ||
      "mongodb+srv://np05cp4a240274:thisIShackathon2026@knowyourpotential.o4gjnbt.mongodb.net/?appName=KnowYourPotential";

    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
