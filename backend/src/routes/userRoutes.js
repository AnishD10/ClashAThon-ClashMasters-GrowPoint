const express = require("express");
const {
  getUserProfile,
  updateUserProfile,
  getUserDashboard,
  getUserProgress,
} = require("../controllers/userController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/profile", protect, getUserProfile);
router.patch("/profile", protect, updateUserProfile);
router.get("/dashboard", protect, getUserDashboard);
router.get("/progress", protect, getUserProgress);

module.exports = router;
