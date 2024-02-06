const express = require("express");
const router = express.Router();
const cartController = require("../controller/cartController");

router.post("/cart", cartController.addToCart);
router.get("/cart", cartController.getAllCart);
router.patch("/cart", cartController.updateCart);
router.delete("/cart/:id_cart", cartController.deleteCartById);
router.delete("/cart", cartController.deleteAllCart);

module.exports = router;