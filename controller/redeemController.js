const { Redeems, User, Coin_History } = require("../models");

const redeemCoin = async (req, res) => {
  try {
    const id_user = req.user.userId;
    const user = await User.findOne({
      where: { id_user },
    });

    if (user) {
      const { coin_redeem, ...redeemData } = req.body;
      const newRedeem = await Redeems.create({
        ...redeemData,
        id_user,
        coin_redeem: coin_redeem,
      });

      if (newRedeem) {
        user.coin_user -= coin_redeem;
        await user.save();

        await Coin_History.create({
          coin_history: coin_redeem,
          id_redeem: newRedeem.id_redeem,
          desc_transaction: "Koin ditukar",
          id_user: id_user,
        });

        res.status(201).json(newRedeem);
      } else {
        res.status(500).json({ error: "Failed to create redeem" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "redeem failed" });
  }
};

module.exports = {
  redeemCoin,
};
