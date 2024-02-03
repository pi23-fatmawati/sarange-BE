const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const { authenticateToken } = require("../middleware/mid");

router.get("/products", authenticateToken, productController.getAllProducts);
router.get("/product/:id", authenticateToken, productController.getProductById);
router.post("/add-cart/:id", authenticateToken, productController.addToCart);
router.get("/all-cart", authenticateToken, productController.getAllCart);
router.get("/transactions", authenticateToken, productController.getTransaction);
router.get("/transactions/:id", authenticateToken, productController.getTransactionById);

module.exports = router;