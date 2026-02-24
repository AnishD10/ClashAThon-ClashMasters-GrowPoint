const mongoose = require("mongoose");

const learningPathSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
    category: String,
    target_users: [
      {
        type: String,
      },
    ],
    skills: [
      {
        skill_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Skill",
        },
        order: Number,
        is_mandatory: Boolean,
      },
    ],
    total_hours: Number,
    difficulty_level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
    },
    job_outcomes: [String],
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LearningPath", learningPathSchema);
