const express = require("express");
const app = express.Router();
const redeemController = require("../controller/redeemController");

app.post("/redeem", redeemController.redeemCoin);

module.exports = app;
