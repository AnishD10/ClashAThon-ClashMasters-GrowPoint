const Course = require("../models/Course");

exports.getAllCourses = async (req, res) => {
  try {
    const { skill_id, difficulty_level, provider, is_free } = req.query;

    const filter = { is_active: true };
    if (skill_id) filter.skills = { $in: [skill_id] };
    if (difficulty_level) filter.difficulty_level = difficulty_level;
    if (provider) filter.provider = provider;
    if (is_free !== undefined) filter.is_free = is_free === "true";

    const courses = await Course.find(filter).sort({ title: 1 });
    res.status(200).json({ success: true, count: courses.length, courses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        error: "Invalid course ID format. Must be a valid MongoDB ObjectId (24 hex characters).",
      });
    }

    const course = await Course.findById(id).populate("skills");
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json({ success: true, course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({ success: true, course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
