const { verifyToken } = require("../utils/auth");

function authenticateToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  const decoded = verifyToken(token);
  if (!decoded) return res.status(401).json({ error: "Invalid token" });

  req.user = decoded; // Attach the user information to the request object
  next();
}

module.exports = { authenticateToken };
