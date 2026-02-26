const express = require("express");
const {
  getAllAssessments,
  startAssessment,
  submitAssessment,
  getRecommendations,
  getCareerRecommendations,
  getUserAssessmentHistory,
  getParentReport,
} = require("../controllers/assessmentController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/", getAllAssessments);
router.post("/start", protect, startAssessment);
router.post("/submit", protect, submitAssessment);
router.get("/recommendations/personalized", protect, getRecommendations);
router.get("/recommendations/careers", protect, getCareerRecommendations);
router.get("/recommendations/parent-report", protect, getParentReport);
router.get("/history/user", protect, getUserAssessmentHistory);

module.exports = router;
