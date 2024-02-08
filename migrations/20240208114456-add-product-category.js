"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    // Menambahkan kolom category pada tabel Products
    await queryInterface.addColumn("Products", "category", {
      type: Sequelize.ENUM("kaca", "plastik", "kertas", "organik"),
      allowNull: false,
      defaultValue: "kaca", // Anda dapat mengatur nilai default sesuai kebutuhan
    });
  },
  async down(queryInterface, Sequelize) {
    // Menghapus kolom category dari tabel Products
    await queryInterface.removeColumn("Products", "category");
  },
};
