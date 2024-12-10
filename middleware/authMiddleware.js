const jwt = require("jsonwebtoken");

// Middleware to protect routes
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization; // Expecting "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: "Access denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to the request object
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = authenticateUser;
