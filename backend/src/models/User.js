const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

/**
 * User Schema
 * WHY: Stores user account data, authentication credentials, and preferences
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email format"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 6,
      select: false, // Don't return password by default
    },
    education_level: {
      type: String,
      enum: ["+2", "Bachelor's", "Master's", "Other"],
      default: "+2",
    },
    interests: [String], // e.g., ["Web Development", "Data Science"]
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
    profile_completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

/**
 * Hash password before saving
 * WHY: Security - passwords must never be stored in plain text
 */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * Compare password method
 * WHY: Used during login to verify user credentials
 */
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
