#!/usr/bin/env node

const path = require("path");
const mongoose = require("mongoose");

require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"),
  override: false,
});

const Assessment = require("../models/Assessment");
const UserProgress = require("../models/UserProgress");

const LIKERT_OPTIONS = [
  "Strongly Disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly Agree",
];

const getArgValue = (key) => {
  const index = process.argv.indexOf(key);
  if (index === -1) return null;
  return process.argv[index + 1] || null;
};

const getLikertScore = (response) => {
  const likertMap = {
    "Strongly Disagree": 1,
    Disagree: 2,
    Neutral: 3,
    Agree: 4,
    "Strongly Agree": 5,
  };
  return likertMap[response] || 0;
};

const seedUserProgress = async () => {
  const userId = getArgValue("--userId");
  const perAssessmentRaw = getArgValue("--perAssessment") || "1";
  const status = getArgValue("--status") || "Completed";

  const perAssessment = Number(perAssessmentRaw);

  if (!userId) {
    throw new Error("Missing --userId argument");
  }
  if (!Number.isInteger(perAssessment) || perAssessment <= 0) {
    throw new Error("--perAssessment must be a positive integer");
  }

  console.log("Connecting to MongoDB...");
  await mongoose.connect(
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/knowyourpotential",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  console.log("Connected.");

  const assessments = await Assessment.find({ is_active: true });
  if (assessments.length === 0) {
    console.log("No active assessments found.");
    process.exit(0);
  }

  let created = 0;

  for (const assessment of assessments) {
    for (let i = 0; i < perAssessment; i += 1) {
      const answers = assessment.questions.map((question) => {
        if (question.questionType === "mcq" && Array.isArray(question.options)) {
          return question.options[0] || "";
        }
        const randomIndex = Math.floor(Math.random() * LIKERT_OPTIONS.length);
        return LIKERT_OPTIONS[randomIndex];
      });

      let totalScore = 0;
      let totalMaxScore = 0;

      assessment.questions.forEach((question, index) => {
        if (question.questionType === "likert") {
          totalScore += getLikertScore(answers[index]);
          totalMaxScore += 5;
        }
      });

      const percentage =
        totalMaxScore > 0 ? Math.round((totalScore / totalMaxScore) * 100) : 0;

      const progressPayload = {
        user_id: userId,
        assessment_id: assessment._id,
        status,
        started_at: new Date(),
      };

      if (status === "Completed") {
        progressPayload.score = percentage;
        progressPayload.completion_percentage = percentage;
        progressPayload.completed_at = new Date();
      }

      await UserProgress.create(progressPayload);
      created += 1;
    }
  }

  console.log(`Seeded ${created} UserProgress record(s).`);
  process.exit(0);
};

seedUserProgress().catch((error) => {
  console.error("Seed failed:", error.message);
  process.exit(1);
});
