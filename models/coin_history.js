"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Coin_History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Coin_History.belongsTo(models.redeem, { foreignKey: "id_redeem" });
    }
  }
  Coin_History.init(
    {
      desc_transaction: DataTypes.STRING,
      coin_history: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Coin_History",
      timestamps: true,
    }
  );
  return Coin_History;
};
