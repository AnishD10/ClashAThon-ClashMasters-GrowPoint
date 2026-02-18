const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:3000" }));
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/skills", require("./routes/skillRoutes"));
app.use("/api/assessments", require("./routes/assessmentRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Server is running", timestamp: new Date() });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});

module.exports = app;
