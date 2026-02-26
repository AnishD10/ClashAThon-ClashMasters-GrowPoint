const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
      minlength: 8,
      select: false,
    },
    education_level: {
      type: String,
      enum: ["+2", "Bachelor's", "Master's", "Other"],
      default: "+2",
    },
    interests: [String],
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
    profile_completed: {
      type: Boolean,
      default: false,
    },
    avatar_url: {
      type: String,
      default: null,
    },
    avatar_public_id: {
      type: String,
      default: null,
    },
    phone: String,
    date_of_birth: Date,
    gender: {
      type: String,
      enum: ["Male", "Female", "Other", "Prefer not to say"],
    },
    city: String,
    bio: String,
    academic_performance: {
      type: String,
      enum: ["High", "Medium", "Low"],
    },
    budget_preference: Number,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true }
);

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

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
