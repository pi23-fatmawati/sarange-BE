'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class redeem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      redeem.hasMany(models.Coin_History, { foreignKey: 'id_redeem' })
    }
  }
  redeem.init({
    phone_number: DataTypes.STRING,
    date_time: DataTypes.DATE,
    e_wallet: DataTypes.STRING,
    money_get: DataTypes.INTEGER,
    coin_redeem: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'redeem',
  });
  return redeem;
};