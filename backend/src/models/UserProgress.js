const mongoose = require("mongoose");

/**
 * User Progress Schema
 * WHY: Tracks each user's learning journey, completion status, and performance
 * Essential for personalization and progress visualization
 */
const userProgressSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    skill_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
    },
    assessment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assessment",
    },
    status: {
      type: String,
      enum: ["Not Started", "In Progress", "Completed"],
      default: "Not Started",
    },
    score: Number, // Assessment score out of 100
    completion_percentage: {
      type: Number,
      default: 0,
    },
    started_at: Date,
    completed_at: Date,
    time_spent_hours: {
      type: Number,
      default: 0,
    },
    notes: String,
  },
  { timestamps: true }
);

// Compound index for unique user-skill tracking
userProgressSchema.index({ user_id: 1, skill_id: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model("UserProgress", userProgressSchema);
