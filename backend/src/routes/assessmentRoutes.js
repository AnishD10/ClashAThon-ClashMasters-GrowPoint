const express = require("express");
const {
  getAllAssessments,
  startAssessment,
  submitAssessment,
  getRecommendations,
  getUserAssessmentHistory,
} = require("../controllers/assessmentController");
const { protect } = require("../middleware/auth");

const router = express.Router();

/**
 * Assessment Routes
 * GET /api/assessments - Get all available assessments
 * POST /api/assessments/start - Start an assessment
 * POST /api/assessments/submit - Submit assessment answers
 * GET /api/assessments/recommendations - Get personalized learning paths
 * GET /api/assessments/history - Get user's assessment history
 */

router.get("/", getAllAssessments);
router.post("/start", protect, startAssessment);
router.post("/submit", protect, submitAssessment);
router.get("/recommendations/personalized", protect, getRecommendations);
router.get("/history/user", protect, getUserAssessmentHistory);

module.exports = router;
