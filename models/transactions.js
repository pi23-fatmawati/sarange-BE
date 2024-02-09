"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    static associate(models) {
      Transactions.belongsTo(models.Cart, { foreignKey: "id_cart" });
      Transactions.hasMany(models.Coin_History, {
        foreignKey: "id_transaction",
      });
      Transactions.belongsTo(models.User, { foreignKey: "id_user" }); // Menambahkan asosiasi dengan model User
    }
  }
  Transactions.init(
    {
      id_transaction: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      id_cart: DataTypes.INTEGER,
      id_user: DataTypes.INTEGER,
      status: {
        type: DataTypes.ENUM("Diproses, Konfirmasi, Selesai"),
        defaultValue: "Diproses",
      },
      pickup_date: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      modelName: "Transactions",
    }
  );
  return Transactions;
};
