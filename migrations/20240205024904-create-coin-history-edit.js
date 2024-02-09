"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Coin_Histories", {
      id_coin_history: {
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
      id_transaction: {
        references: { model: "Transactions", key: "id_transaction" },
        type: Sequelize.INTEGER,
      },
      id_redeem: {
        allowNull: true,
        references: { model: "Redeems", key: "id_redeem" },
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
