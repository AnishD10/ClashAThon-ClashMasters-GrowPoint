const mongoose = require("mongoose");

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
    score: Number,
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

// Index for querying user progress by skill (non-unique, allows multiple assessment attempts)
userProgressSchema.index({ user_id: 1, skill_id: 1 });

module.exports = mongoose.model("UserProgress", userProgressSchema);
