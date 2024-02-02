const { redeem } = require('../models');
const { Coin_History } = require('../models');

const redeemCoin = async (req, res) => {
  try {
    const { coin_redeem, ...redeemData } = req.body;
    const newRedeem = await redeem.create({
      ...redeemData,
    coin_redeem: coin_redeem,});

    if (newRedeem) {
      await Coin_History.create({
        coin_history: coin_redeem,
        id_redeem: newRedeem.id,
        desc_transaction: 'Koin ditukar',
      });
    }

    res.status(201).json(newRedeem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

module.exports = {
  redeemCoin
};
