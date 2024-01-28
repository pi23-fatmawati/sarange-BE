const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const { authenticateToken } = require("../middleware/mid");

router.get("/products", authenticateToken, productController.getAllProducts);
router.get("/product/:id", authenticateToken, productController.getProductById);

module.exports = router;
