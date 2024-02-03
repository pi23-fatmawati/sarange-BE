const { Cart, Product } = require("../models");
const addToCart = async (req, res) => {
  try {
    const { id_product, total_product } = req.body;
    const id_user = req.user.userId;
    console.log(id_user);

    let existingCartItem = await Cart.findOne({
      where: {
        id_user,
        id_product,
      },
      include: [Product],
    });

    if (existingCartItem) {
      const total_product = req.body;
      await existingCartItem.increment("total_product", { by: total_product });

      existingCartItem.total_coin =
        existingCartItem.total_product * existingCartItem.Product.coin;
      await existingCartItem.save();

      return res.status(200).json({
        message: "Memperbarui kuantitas dan koin produk",
        cartItem: existingCartItem,
      });
    } else {
      const product = await Product.findByPk(id_product);
      const cart = await Cart.create({
        id_user,
        id_product,
        total_product: 1,
        total_coin: product.coin * 1,
        is_sold: false,
      });

      const cartWithUserIdAndProductId = {
        id_user,
        id_product,
        ...cart.toJSON(),
      };
      res.status(201).json(cartWithUserIdAndProductId);
    }
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
