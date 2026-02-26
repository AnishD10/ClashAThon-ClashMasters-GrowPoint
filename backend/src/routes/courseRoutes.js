const express = require("express");
const {
  getAllCourses,
  getCourseById,
  createCourse,
} = require("../controllers/courseController");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.post("/", protect, adminOnly, createCourse);

module.exports = router;
