const express = require("express");
const app = express.Router();
const coinHistoryController = require("../controller/coinHistoryController");

app.get("/coin-history", coinHistoryController.findCoinHistory);

module.exports = app;
