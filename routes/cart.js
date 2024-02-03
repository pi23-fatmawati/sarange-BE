// routes/cart.js
const express = require("express");
const router = express.Router();
const cartController = require("../controller/cartController");

// POST endpoint untuk menambahkan produk ke cart
router.post("/cart", cartController.addToCart);

// GET endpoint untuk menampilkan semua produk dalam cart
router.get("/cart", cartController.getAllCart);

module.exports = router;
