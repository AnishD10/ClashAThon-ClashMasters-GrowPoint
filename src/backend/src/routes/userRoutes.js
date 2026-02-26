const express = require("express");
const {
  getUserProfile,
  updateUserProfile,
  getUserDashboard,
  getUserProgress,
  upsertSkillProgress,
  updateUserProgress,
  uploadAvatar,
  deleteAvatar,
  uploadMiddleware,
} = require("../controllers/userController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/profile", protect, getUserProfile);
router.patch("/profile", protect, updateUserProfile);
router.post("/profile/avatar", protect, uploadMiddleware, uploadAvatar);
router.delete("/profile/avatar", protect, deleteAvatar);
router.get("/dashboard", protect, getUserDashboard);
router.get("/progress", protect, getUserProgress);
router.post("/progress/skill", protect, upsertSkillProgress);
router.patch("/progress/:id", protect, updateUserProgress);

module.exports = router;
