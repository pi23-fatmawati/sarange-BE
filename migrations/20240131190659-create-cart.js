'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Carts', {
      id_cart: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      total_product: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      total_coin: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      is_sold: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id_user'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_product: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: 'id_product'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Carts');
  }
};