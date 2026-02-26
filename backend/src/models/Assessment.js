const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    category: {
      type: String,
      enum: ["aptitude", "technical", "personality", "analytical", "all"],
      default: "aptitude",
    },
    duration_minutes: Number,
    questions: [
      {
        question: String,
        questionType: {
          type: String,
          enum: ["likert", "mcq"],
          default: "likert",
        },
        // Standard options (for likert scale)
        options: [String],
        correct_answer: String,
        explanation: String,
        difficulty: {
          type: String,
          enum: ["easy", "medium", "hard"],
          default: "medium",
        },
        // Skill weightings - critical for scoring engine
        skillWeights: {
          analytical: { type: Number, default: 0, min: 0, max: 10 },
          technical: { type: Number, default: 0, min: 0, max: 10 },
          creative: { type: Number, default: 0, min: 0, max: 10 },
          communication: { type: Number, default: 0, min: 0, max: 10 },
          leadership: { type: Number, default: 0, min: 0, max: 10 },
          problem_solving: { type: Number, default: 0, min: 0, max: 10 },
          attention_to_detail: { type: Number, default: 0, min: 0, max: 10 },
          teamwork: { type: Number, default: 0, min: 0, max: 10 },
        },
        // Option mappings - how each answer contributes to skills
        optionMappings: [
          {
            optionIndex: Number,
            weights: {
              analytical: { type: Number, default: 0 },
              technical: { type: Number, default: 0 },
              creative: { type: Number, default: 0 },
              communication: { type: Number, default: 0 },
              leadership: { type: Number, default: 0 },
              problem_solving: { type: Number, default: 0 },
              attention_to_detail: { type: Number, default: 0 },
              teamwork: { type: Number, default: 0 },
            },
          },
        ],
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
