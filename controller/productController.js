const { Product, Cart, Transaction } = require("../models");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: [
        "product_name",
        "product_pic",
        "coin",
        "min_product",
        "unit",
      ],
    });
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id, {
      attributes: ["product_name", "product_pic", "coin", "description"],
    });
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addToCart = async (req, res) => {
  const { id } = req.params;
  // const userId = req.user.id;
  try {
    const product = await Product.findByPk(id, {
      attributes: ["product_name", "product_pic", "coin"],
    });
    if (!product) {
      return res.status(404).json({ error: "Produk tidak ditemukan" });
    }
    let cartItem = await Cart.findOne({
      where: {
        // UserId: userId,
        ProductId: id,
      },
    });
    if (!cartItem) {
      cartItem = await Cart.create({
        // UserId: userId,
        ProductId: id,
        quantity: 1,
      });
      return res
        .status(200)
        .json({
          message: "Produk berhasil ditambahkan ke keranjang",
          cartItem,
        });
    }
    await cartItem.increment("quantity", { by: 1 });
    return res
      .status(200)
      .json({
        message: "Kuantitas produk di keranjang berhasil diperbarui",
        cartItem,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllCart = async (req, res) => {
  try {
    const cart = await Cart.findAll();
    if (cart.products.length === 0) {
      return res.status(404).json({ error: "Tidak ada produk di keranjang" });
    } else {
      return res.status(200).json({
        message: "Menampilkan keranjang",
        cart,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTransaction = async (req, res) => {
  try {
    const soldCarts = await Cart.findAll({
      where: { isSold: true },
      include: {
        model: User,
        attributes: ["id_user", "user_name", "phone_number", "address"],
      },
    });

    if (!soldCarts || soldCarts.length === 0) {
      return res.status(404).json({ error: "Tidak ada transaksi" });
    }
    const transactionData = await Promise.all(
      soldCarts.map(async (soldCart) => {
        const newTransaction = await Transaction.create({
          userId: soldCart.UserId,
          cartId: soldCart.id_cart,
          datetime: soldCart.updatedAt,
        });

        return {
          transactionId: newTransaction.id,
          userId: soldCart.UserId,
          userName: soldCart.User.user_name,
          userPhone: soldCart.User.phone_number,
          userAddress: soldCart.User.address,
          status: "Diproses",
          datetime: newTransaction.updatedAt,
        };
      })
    );

    res.status(200).json(transactionData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findByPk(id, {
      include: [
        {
          model: Cart,
          include: {
            model: User,
            attributes: ["id_user", "user_name", "phone_number", "address"],
          },
        },
      ],
    });

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    const transactionData = {
      transactionId: transaction.id,
      userId: transaction.Cart.UserId,
      userName: transaction.Cart.User.user_name,
      userPhone: transaction.Cart.User.phone_number,
      userAddress: transaction.Cart.User.address,
      status: transaction.status,
      datetime: transaction.datetime,
    };

    res.status(200).json(transactionData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addToCart,
  getAllCart,
  getTransaction,
  getTransactionById,
};
