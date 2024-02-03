"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transactions.init(
    {
      id_transaction: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_user: DataTypes.INTEGER,
      id_cart: DataTypes.INTEGER,
      status: DataTypes.ENUM("Konfirmasi", "Diproses", "Selesai"),
    },
    {
      sequelize,
      modelName: "Transactions",
    }
  );
  return Transactions;
};
