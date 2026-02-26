const mongoose = require("mongoose");

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
    learning_time_hours: Number,
    prerequisites: [String],
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
        type: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Skill", skillSchema);
