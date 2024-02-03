const { Cart } = require("../models");
// Controller untuk menambahkan produk ke cart
const addToCart = async (req, res) => {
  try {
    const { id_product } = req.body;
    const id_user = req.user.userId; // Mengambil id_user dari req.user yang diberikan oleh middleware
    const cart = await Cart.create({
      id_user,
      id_product,
    });

    // Menambahkan ID pengguna dan ID produk ke dalam respons
    const cartWithUserIdAndProductId = {
      id_user,
      id_product,
      ...cart.toJSON(),
    };
    res.status(201).json(cartWithUserIdAndProductId);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller untuk menampilkan semua produk dalam cart berdasarkan id_user yang login
const getAllCart = async (req, res) => {
  try {
    const id_user = req.user.userId; // Mengambil id_user dari req.user yang diberikan oleh middleware
    const carts = await Cart.findAll({ where: { id_user } }); // Filter cart berdasarkan id_user
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addToCart, getAllCart };
