"use strict";

const { sequelize } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Cart", {
      id_cart: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id_product: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      total_coin: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      total_product: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      is_sold: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      is_check: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Cart");
  },
};
