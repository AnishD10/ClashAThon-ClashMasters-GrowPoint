const path = require("path");
const express = require("express");
const cors = require("cors");

require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
  override: false,
});

const connectDB = require("./config/db");

const app = express();

console.log("Starting server and connecting to database...");
connectDB();

const allowedOrigins = [
  "http://localhost:3000",
  "https://clash-a-thon-clash-masters-grow-poi-nu.vercel.app",
  process.env.CORS_ORIGIN,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (mobile apps, curl, etc.)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/skills", require("./routes/skillRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/assessments", require("./routes/assessmentRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/careers", require("./routes/careerProfileRoutes"));
app.use("/api/interests", require("./routes/interestRoutes"));

app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Server is running", timestamp: new Date() });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT} `);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});



module.exports = app;
