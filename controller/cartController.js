const { Cart, Product } = require("../models");

const addToCart = async (req, res) => {
  try {
    const { id_product } = req.body;
    const id_user = req.user.userId;
    console.log(id_user);

    let existingCartItem = await Cart.findOne({
      where: {
        id_user,
        id_product,
        is_sold: false,
      },
      include: [Product],
    });

    if (existingCartItem) {
      existingCartItem.total_product += 1;
      existingCartItem.total_coin =
        existingCartItem.total_product * existingCartItem.Product.coin;
      await existingCartItem.save();

      return res.status(200).json({
        message:
          "Memperbarui kuantitas dan koin produk yang sudah ada di keranjang",
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
      res.status(201).json({
        message: "Berhasil menambahkan produk ke keranjang",
        cartWithUserIdAndProductId,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllCart = async (req, res) => {
  try {
    const id_user = req.user.userId;
    const carts = await Cart.findAll({
      where: { id_user, is_sold: false },
      include: [{ model: Product }],
    });
    if (carts.length === 0) {
      return res.status(404).json({ message: "Tidak ada produk di keranjang" });
    }
    res.status(200).json({
      message: `Menampilkan semua produk di keranjang untuk user id: ${id_user}`,
      carts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { cartItems } = req.body;
    const id_user = req.user.userId;

    const updatedCartItems = await Promise.all(
      cartItems.map(async (cartItem) => {
        const { id_cart, total_product, is_check } = cartItem;

        const existingCartItem = await Cart.findOne({
          where: {
            id_cart,
            id_user,
            is_sold: false,
          },
          include: [Product],
        });

        if (!existingCartItem) {
          return res.status(400).json({
            message: `ID Cart ${id_cart} tidak ditemukan`,
          });
        }

        if (
          (total_product !== undefined &&
            total_product !== existingCartItem.total_product) ||
          (is_check !== undefined && is_check !== existingCartItem.is_check)
        ) {
          existingCartItem.total_product = total_product;
          existingCartItem.total_coin =
            total_product * existingCartItem.Product.coin;
          existingCartItem.is_check = is_check;

          await existingCartItem.save();

          return {
            message: "Keranjang berhasil diupdate dengan perubahan",
            cartItem: existingCartItem,
          };
        } else {
          return {
            message: "Keranjang berhasil diupdate tanpa perubahan",
            cartItem: existingCartItem,
          };
        }
      })
    );

    res.status(200).json({
      message: "Update keranjang berhasil",
      updatedCartItems,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCartById = async (req, res) => {
  try {
    const { id_cart } = req.params;
    const id_user = req.user.userId;

    const cartItem = await Cart.findOne({
      where: { id_cart, id_user },
    });
    if (!cartItem) {
      return res.status(404).json({ message: "ID Cart tidak ditemukan" });
    }
    await cartItem.destroy();
    res.status(200).json({
      message: `Keranjang id: ${id_cart} berhasil dihapus`,
      cartItem,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAllCart = async (req, res) => {
  try {
    const id_user = req.user.userId;
    await Cart.destroy({ where: { id_user } });
    res.status(200).json({
      message: `Semua produk di keranjang untuk user id: ${id_user} berhasil dihapus`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addToCart,
  getAllCart,
  updateCart,
  deleteCartById,
  deleteAllCart,
};
