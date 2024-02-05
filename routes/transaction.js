const express = require("express");
const router = express.Router();
const cartController = require("../controller/transactionController");

router.post("/transaction", cartController.createTransaction);
router.get("/transaction", cartController.getAllTransactions);
router.get("/transaction/process", cartController.getTransactionOnProcess);
router.get("/transaction/confirm", cartController.getTransactionToConfirm);
router.get("/transaction/success", cartController.getTransactionSuccess);
router.patch("/transaction", cartController.confirmTransaction);

module.exports = router;