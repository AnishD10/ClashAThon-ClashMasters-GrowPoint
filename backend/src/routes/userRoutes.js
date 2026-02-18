const express = require("express");
const {
  getUserProfile,
  updateUserProfile,
  getUserDashboard,
  getUserProgress,
} = require("../controllers/userController");
const { protect } = require("../middleware/auth");

const router = express.Router();

/**
 * User Routes (all require authentication)
 * GET /api/users/profile - Get user profile
 * PATCH /api/users/profile - Update user profile
 * GET /api/users/dashboard - Get learning dashboard with stats
 * GET /api/users/progress - Get detailed learning progress
 */

router.get("/profile", protect, getUserProfile);
router.patch("/profile", protect, updateUserProfile);
router.get("/dashboard", protect, getUserDashboard);
router.get("/progress", protect, getUserProgress);

module.exports = router;
