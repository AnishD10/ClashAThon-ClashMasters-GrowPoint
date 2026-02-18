const jwt = require("jsonwebtoken");

/**
 * Authentication Middleware
 * WHY: Verifies JWT token and protects routes from unauthorized access
 * Attaches user info to request object for use in controllers
 */
const protect = async (req, res, next) => {
  try {
    let token;

    // Get token from headers
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ error: "Not authorized to access this route" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token is invalid" });
  }
};

/**
 * Admin Check Middleware
 * WHY: Restricts certain routes to admin users only
 */
const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access only" });
  }
  next();
};

module.exports = { protect, adminOnly };
