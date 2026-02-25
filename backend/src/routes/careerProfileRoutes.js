const express = require("express");
const {
  getAllCareerProfiles,
  getCareerProfileById,
} = require("../controllers/careerProfileController");

const router = express.Router();

router.get("/", getAllCareerProfiles);
router.get("/:id", getCareerProfileById);

module.exports = router;
