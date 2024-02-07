"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      id_product: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      product_name: DataTypes.STRING,
      category: DataTypes.ENUM("Kertas", "Plastik", "Kaca", "Karung Plastik", "Tetra Pack"),
      description: DataTypes.STRING,
      coin: DataTypes.INTEGER,
      min_product: DataTypes.INTEGER,
      product_pic: DataTypes.STRING,
      unit: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
