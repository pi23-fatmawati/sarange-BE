"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Coin_Histories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      desc_transaction: {
        type: Sequelize.ENUM("Koin ditukar", "Koin bertambah"),
      },
      coin_history: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id_redeem: {
        allowNull: false,
        references: { model: "Redeems", key: "id" },
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("Coin_Histories");
  },
};
