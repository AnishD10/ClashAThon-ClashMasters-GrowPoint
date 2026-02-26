const express = require("express");
const {
  getAllCareerProfiles,
  getCareerProfileById,
  getCareerProfileDetail,
  getConstraintRecommendations,
  createCareerProfile,
  updateCareerProfile,
  deleteCareerProfile,
} = require("../controllers/careerProfileController");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

router.get("/", getAllCareerProfiles);
router.post("/recommendations/constraints", protect, getConstraintRecommendations);
router.post("/", protect, adminOnly, createCareerProfile);
router.get("/:id/detail", getCareerProfileDetail);
router.get("/:id", getCareerProfileById);
router.put("/:id", protect, adminOnly, updateCareerProfile);
router.delete("/:id", protect, adminOnly, deleteCareerProfile);

module.exports = router;
