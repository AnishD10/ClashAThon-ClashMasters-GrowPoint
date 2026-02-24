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

router.get("/", getAllAssessments);
router.post("/start", protect, startAssessment);
router.post("/submit", protect, submitAssessment);
router.get("/recommendations/personalized", protect, getRecommendations);
router.get("/history/user", protect, getUserAssessmentHistory);

module.exports = router;
