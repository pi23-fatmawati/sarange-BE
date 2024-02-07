const { Transactions, Cart, Product, User } = require("../models");

const createTransaction = async (req, res) => {
  try {
    const { cartItems } = req.body;
    const transactions = await Promise.all(
      cartItems.map(async (cartItem) => {
        const { id_cart, pickup_date } = cartItem;
        const existingCartItem = await Cart.findOne({
          where: {
            id_cart,
            id_user: req.user.userId,
            is_check: true,
          },
          include: [Product],
        });

        if (!existingCartItem) {
          return res.status(404).json({
            message: `ID Cart ${id_cart} tidak ditemukan atau produk belum dichecklist`,
          });
        } else {
          const transaction = await Transactions.create({
            id_cart: existingCartItem.id_cart,
            status: "Diproses",
            pickup_date: pickup_date,
          });

          await existingCartItem.update({ is_check: false, is_sold: true });

          return transaction;
        }
      })
    );

    res.status(201).json({
      message: "Transaksi berhasil dibuat",
      transactions,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Cart.findAll({
      where: {
        id_user: req.user.userId,
        is_sold: true,
      },
    });
    if (transactions.length == 0) {
      return res.status(404).json({
        message: "Belum ada transaksi",
      });
    } else {
      res.status(200).json({
        message: "Berhasil mengambil semua data transaksi",
        transactions,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getTransactionOnProcess = async (req, res) => {
  try {
    const transactions = await Transactions.findAll({
      where: {
        status: "Diproses",
      },
    });
    if (transactions.length == 0) {
      return res.status(404).json({
        message: "Belum ada transaksi diproses",
      });
    } else {
      res.status(200).json({
        message: "Berhasil mengambil semua data transaksi diproses",
        transactions,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getTransactionToConfirm = async (req, res) => {
  try {
    const transactions = await Transactions.findAll({
      where: {
        status: "Konfirmasi",
      },
    });
    if (transactions.length == 0) {
      return res.status(404).json({
        message: "Belum ada transaksi untuk dikonfirmasi",
      });
    } else {
      res.status(200).json({
        message: "Berhasil mengambil semua data transaksi untuk dikonfirmasi",
        transactions,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getTransactionSuccess = async (req, res) => {
  try {
    const transactions = await Transactions.findAll({
      where: {
        status: "Selesai",
      },
    });
    if (transactions.length == 0) {
      return res.status(404).json({
        message: "Belum ada transaksi selesai",
      });
    } else {
      res.status(200).json({
        message: "Berhasil mengambil semua data transaksi selesai",
        transactions,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const confirmTransaction = async (req, res) => {
  try {
    const { id_transaction } = req.body;

    const existingTransaction = await Transactions.findOne({
      where: {
        id_transaction,
        status: "Diproses" || "Konfirmasi",
      },
    });

    if (!existingTransaction) {
      return res.status(404).json({
        message: `ID Transaksi ${id_transaction} tidak ditemukan atau status bukan "Konfirmasi" atau belum terjual`,
      });
    }

    await existingTransaction.update({ status: "Selesai" });

    res.status(200).json({
      message: `ID Transaksi ${id_transaction} telah dikonfirmasi dan selesai`,
      transaction: existingTransaction,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const calculateMetrics = async (req, res) => {
  try {
    const transactions = await Transactions.findAll({
      where: {
        status: "Selesai",
      },
      include: [
        {
          model: Cart,
          include: [Product],
        },
      ],
    });

    if (transactions.length === 0) {
      return res.status(404).json({
        message: "Belum ada transaksi selesai",
      });
    }

    const emissionFactors = transactions.map((transaction) => {
      if (transaction.Carts && transaction.Carts.length > 0) {
        return transaction.Carts.map((cart) => {
          const { total_product, Product } = cart;
          return calculateEmissionFactor(total_product, Product.category);
        });
      } else {
        return [];
      }
    });

    const newEmissionFactors = [].concat(...emissionFactors);
    console.log(newEmissionFactors)
    const totalEmissionFactor = newEmissionFactors.reduce(
      (total, factor) => total + factor,
      0
    );

    res.status(200).json({
      message: "Berhasil menghitung faktor emisi",
      totalEmissionFactor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const calculateEmissionFactor = (totalProduct, category) => {
  if (category === null) {
    return 0;
  }

  switch (category) {
    case "Kertas":
      return totalProduct * 0.43;
    case "Plastik":
      return totalProduct * 1.4;
    case "Kaca":
      return totalProduct * 0.21;
    case "Tetra Pack":
      return totalProduct * 0.84;
    case "Karung Plastik":
      return totalProduct * 2.5;
    default:
      return 0;
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionOnProcess,
  getTransactionToConfirm,
  getTransactionSuccess,
  confirmTransaction,
  calculateMetrics,
};
