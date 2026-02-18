const express = require("express");
const {
  getAllSkills,
  getSkillById,
  getCategories,
  createSkill,
  getLearningPaths,
  getLearningPathById,
} = require("../controllers/skillController");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

/**
 * Skill Routes
 * GET /api/skills - Get all skills (with filters)
 * GET /api/skills/:id - Get single skill
 * GET /api/skills/categories - Get all categories
 * POST /api/skills - Create skill (admin only)
 */

router.get("/", getAllSkills);
router.get("/categories/list", getCategories);
router.get("/:id", getSkillById);
router.post("/", protect, adminOnly, createSkill);

/**
 * Learning Path Routes
 * GET /api/skills/paths - Get all learning paths
 * GET /api/skills/paths/:id - Get single learning path
 */

router.get("/paths/all", getLearningPaths);
router.get("/paths/:id", getLearningPathById);

module.exports = router;
