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

router.get("/", getAllSkills);
router.get("/categories/list", getCategories);
router.get("/:id", getSkillById);
router.post("/", protect, adminOnly, createSkill);

router.get("/paths/all", getLearningPaths);
router.get("/paths/:id", getLearningPathById);

module.exports = router;
