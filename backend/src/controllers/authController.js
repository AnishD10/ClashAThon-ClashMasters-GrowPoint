const User = require("../models/User");
const jwt = require("jsonwebtoken");

/**
 * Register Controller
 * WHY: Creates new user account with validation
 * Encrypts password and returns JWT token for immediate login
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password, education_level } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please provide all required fields" });
    }

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Create user
    user = await User.create({
      name,
      email,
      password,
      education_level,
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        education_level: user.education_level,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Login Controller
 * WHY: Authenticates user with email/password
 * Returns JWT token used in subsequent API requests
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: "Please provide email and password" });
    }

    // Check if user exists (select password field)
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        education_level: user.education_level,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get Current User
 * WHY: Returns logged-in user's profile data
 */
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
