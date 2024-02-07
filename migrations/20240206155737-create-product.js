"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id_product: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      product_name: {
        type: Sequelize.STRING,
      },
      category: {
        type: Sequelize.ENUM("Kertas", "Plastik", "Kaca", "Karung Plastik", "Tetra Pack"),
      },
      description: {
        type: Sequelize.STRING,
      },
      coin: {
        type: Sequelize.INTEGER,
      },
      min_product: {
        type: Sequelize.INTEGER,
      },
      product_pic: {
        type: Sequelize.STRING,
      },
      unit: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Products");
  },
};