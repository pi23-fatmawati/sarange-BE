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
      id_cart: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      id_user: DataTypes.INTEGER,
      id_product: DataTypes.INTEGER,
      total_coin: DataTypes.INTEGER,
      total_product: DataTypes.INTEGER,
      is_sold: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_check: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Cart",
      tableName: "Cart",
    }
  );
  return Cart;
};
