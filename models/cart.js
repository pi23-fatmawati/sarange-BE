"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User, { foreignKey: "id_user" });
      Cart.belongsTo(models.Product, { foreignKey: "id_product" });
    }
  }
  Cart.init(
    {
      id_user: DataTypes.INTEGER,
      id_product: DataTypes.INTEGER,
      total_coin: DataTypes.INTEGER,
      total_product: DataTypes.INTEGER,
      is_sold: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Cart",
      tableName: "cart", // Make sure this matches your table name exactly
      // timestamps: false, // Set this to true if you have timestamps in your table
    }
  );
  return Cart;
};
