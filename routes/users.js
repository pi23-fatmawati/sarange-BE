const express = require("express");
const { useInflection } = require("sequelize");
const router = express.Router();
const userController = require("../controller/userController");
const { authenticateToken } = require("../middleware/mid");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/homepage", authenticateToken, userController.homepage);
router.get("/profile", authenticateToken, userController.profile);
// router.patch("/profile", authenticateToken, userController.updateProfile);
router.patch(
  "/profile",
  authenticateToken,
  userController.updateProfileWithImage
);
module.exports = router;
