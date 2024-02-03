const { Coin_History } = require("../models");

const findCoinHistory = async (req, res) => {
  try {
    const data = await Coin_History.findAll();
    const result = {
      status: "ok",
      data: data,
    };
    res.json(result);
  } catch (error) {
    console.log(error, "error find all coin history");
    res.status(500).json({ error });
  }
};

module.exports = {
  findCoinHistory,
};
