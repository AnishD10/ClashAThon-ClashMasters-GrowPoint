const express = require("express");
const { register, login, getCurrentUser } = require("../controllers/authController");
const { protect } = require("../middleware/auth");

const router = express.Router();

/**
 * Authentication Routes
 * POST /api/auth/register - Create new user account
 * POST /api/auth/login - Login with credentials
 * GET /api/auth/me - Get logged-in user info
 */

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getCurrentUser);

module.exports = router;
