const express = require("express");
const {
  getAllCareerProfiles,
  getCareerProfileById,
  getConstraintRecommendations,
} = require("../controllers/careerProfileController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/", getAllCareerProfiles);
router.post("/recommendations/constraints", protect, getConstraintRecommendations);
router.get("/:id", getCareerProfileById);

module.exports = router;
