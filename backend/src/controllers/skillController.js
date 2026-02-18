const Skill = require("../models/Skill");
const LearningPath = require("../models/LearningPath");

/**
 * Get All Skills
 * WHY: Returns skills catalog with filtering options
 * Users browse and discover all available skills
 */
exports.getAllSkills = async (req, res) => {
  try {
    const { category, difficulty_level, trending } = req.query;

    // Build filter object
    let filter = {};
    if (category) filter.category = category;
    if (difficulty_level) filter.difficulty_level = difficulty_level;
    if (trending) filter.trending = trending === "true";

    const skills = await Skill.find(filter).sort({ trending: -1 });
    res.status(200).json({ success: true, count: skills.length, skills });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get Single Skill
 * WHY: Returns detailed info about a specific skill
 */
exports.getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ error: "Skill not found" });
    }
    res.status(200).json({ success: true, skill });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get Skill Categories
 * WHY: Returns unique categories for filtering (Web Dev, Data Science, etc.)
 */
exports.getCategories = async (req, res) => {
  try {
    const categories = await Skill.distinct("category");
    res.status(200).json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Create Skill (Admin Only)
 * WHY: Allows admins to add new skills to catalog
 */
exports.createSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json({ success: true, skill });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get Learning Paths
 * WHY: Returns curated learning paths grouped by category/job role
 * Solves decision paralysis by showing structured learning sequences
 */
exports.getLearningPaths = async (req, res) => {
  try {
    const { category } = req.query;
    let filter = { is_active: true };
    if (category) filter.category = category;

    const paths = await LearningPath.find(filter).populate("skills.skill_id");
    res.status(200).json({ success: true, count: paths.length, paths });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get Single Learning Path
 * WHY: Returns detailed learning path with all skills and progression
 */
exports.getLearningPathById = async (req, res) => {
  try {
    const path = await LearningPath.findById(req.params.id).populate("skills.skill_id");
    if (!path) {
      return res.status(404).json({ error: "Learning path not found" });
    }
    res.status(200).json({ success: true, path });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
