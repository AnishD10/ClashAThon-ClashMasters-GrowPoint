const mongoose = require("mongoose");

/**
 * Learning Path Schema
 * WHY: Curated sequence of skills in a specific domain
 * Guides users through a structured learning journey instead of random choices
 */
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
        type: String, // e.g., "Web Developer", "Data Analyst"
      },
    ],
    skills: [
      {
        skill_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Skill",
        },
        order: Number, // Sequence within the path
        is_mandatory: Boolean,
      },
    ],
    total_hours: Number,
    difficulty_level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
    },
    job_outcomes: [String], // Jobs learner can pursue after
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LearningPath", learningPathSchema);
