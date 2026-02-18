const mongoose = require("mongoose");

/**
 * Skill Schema
 * WHY: Catalog of all available skills that users can learn
 * Stores skill info like name, category, difficulty, description
 */
const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Skill name is required"],
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      enum: [
        "Web Development",
        "Data Science",
        "Mobile Development",
        "Cloud Computing",
        "DevOps",
        "Cybersecurity",
        "AI/ML",
        "Other",
      ],
      required: true,
    },
    description: String,
    difficulty_level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    learning_time_hours: Number, // Expected hours to learn
    prerequisites: [String], // Other skills needed first
    job_market_demand: {
      type: String,
      enum: ["High", "Medium", "Low"],
    },
    trending: {
      type: Boolean,
      default: false,
    },
    resources: [
      {
        type: String, // URLs to courses, docs, etc.
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Skill", skillSchema);
