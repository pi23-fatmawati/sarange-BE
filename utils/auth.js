const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.JWT_SECRET;

function generateToken(user) {
  const token = jwt.sign(user, secretKey, { expiresIn: "24h" });
  return token;
}

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    console.error("Verifikasi Token gagal:", error.message);
    return null;
  }
}

module.exports = { generateToken, verifyToken };
