const {
  User,
  Transactions,
  Cart,
  Product,
  Coin_History,
} = require("../models");

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
            id_user: req.user.userId,
          });

          await existingCartItem.update({ is_check: false, is_sold: true });

          return transaction;
        }
      })
    );
    if (transactions.length === 0) {
      return res.status(404).json({
        message:
          "Gagal membuat transaksi. Tidak ada transaksi yang berhasil dibuat.",
      });
    }

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
      include: [{ model: Product }],
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
      include: [
        {
          model: Cart,
          include: [
            {
              model: Product,
            },
          ],
        },
      ],
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
      include: [{ model: Cart, include: [{ model: Product }] }],
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
      include: [{ model: Cart, include: [{ model: Product }] }],
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
        status: "Konfirmasi",
      },
      include: [{ model: Cart }],
    });

    if (!existingTransaction) {
      return res.status(404).json({
        message: `ID Transaksi ${id_transaction} tidak ditemukan atau status bukan "Konfirmasi" atau belum terjual`,
      });
    }

    await existingTransaction.update({ status: "Selesai" });

    const totalCoin = existingTransaction.Cart.total_coin;

    // Mengambil pengguna yang sedang login
    const user = await User.findByPk(req.user.userId); // Menggunakan model User untuk mengambil pengguna berdasarkan ID

    // Menambahkan koin ke pengguna yang sedang login
    user.coin_user += totalCoin;

    // Menyimpan perubahan koin pengguna
    await user.save();

    // Membuat catatan histori koin
    const coinHistory = await Coin_History.create({
      desc_transaction: "Koin bertambah",
      coin_history: totalCoin,
      id_transaction: existingTransaction.id_transaction,
    });

    res.status(200).json({
      message: `ID Transaksi ${id_transaction} telah dikonfirmasi dan selesai`,
      transaction: existingTransaction,
      coinHistory,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionOnProcess,
  getTransactionToConfirm,
  getTransactionSuccess,
  confirmTransaction,
};
