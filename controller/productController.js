const { Product } = require("../models");

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

module.exports = {
  getAllProducts,
  getProductById,
};
