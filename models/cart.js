"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.User);
      Cart.belongsToMany(models.Product, { through: 'CartProduct' });
    }
  }

  Cart.init(
    {
      id_cart: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      total_product: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      total_coin: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      is_sold: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      }
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );

  Cart.beforeSave(async (cart, options) => {
    try {
      const products = await cart.getProducts();
      const calculatedTotalCoin = products.reduce((totalCoin, product) => {
        return totalCoin + product.coin * product.CartProduct.quantity;
      }, 0);
      cart.total_coin = calculatedTotalCoin;
    } catch (error) {
      console.error("Error in beforeSave hook:", error);
      throw error;
    }
  });

  return Cart;
};