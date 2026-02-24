const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: String,
    duration_minutes: Number,
    questions: [
      {
        question: String,
        options: [String],
        correct_answer: String,
        explanation: String,
      },
    ],
    passing_score: {
      type: Number,
      default: 60,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Assessment", assessmentSchema);
