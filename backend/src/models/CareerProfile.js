const mongoose = require("mongoose");

const careerProfileSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: String,
    salary_range: {
      entry_min: Number,
      entry_max: Number,
      mid_min: Number,
      mid_max: Number,
      senior_min: Number,
      senior_max: Number,
      currency: {
        type: String,
        default: "NPR",
      },
    },
    demand_indicator: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium",
    },
    qualification_required: [String],
    time_to_employment_months: Number,
    risk_index: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    locations: [String],
    required_skills: [String],
    education_cost_range: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: "NPR",
      },
    },
    education_duration_years: Number,
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CareerProfile", careerProfileSchema);
