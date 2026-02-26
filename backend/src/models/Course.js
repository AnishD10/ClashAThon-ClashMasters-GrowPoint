const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
      unique: true,
    },
    description: String,
    provider: String,
    url: String,
    duration_hours: Number,
    difficulty_level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
    },
    language: String,
    price: Number,
    is_free: {
      type: Boolean,
      default: true,
    },
    thumbnail_url: String,
    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
      },
    ],
    tags: [String],
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
