"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Redeems", {
      id_redeem: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      phone_number: {
        type: Sequelize.STRING,
      },
      e_wallet: {
        type: Sequelize.ENUM("gopay", "dana", "shopeepay", "ovo"),
      },
      money_get: {
        type: Sequelize.INTEGER,
      },
      coin_redeem: {
        type: Sequelize.INTEGER,
      },
      id_user: {
        allowNull: false,
        references: { model: "Users", key: "id_user" },
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
    await queryInterface.dropTable("Redeems");
  },
};
