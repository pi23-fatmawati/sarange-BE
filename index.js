require("dotenv").config();
const PORT = process.env.PORT;
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const transactionRoutes = require("./routes/transaction");
const redeemRoutes = require("./routes/redeem");
const coinHistoryRoutes = require("./routes/coin-history");
const middleware = require("./middleware/mid");
const { authenticateToken } = require("./middleware/mid");
const app = express();

app.use(bodyParser.json());
app.use("/", userRoutes);
app.use("/", authenticateToken, productRoutes);
app.use("/", authenticateToken, cartRoutes);
app.use("/", authenticateToken, transactionRoutes);
app.use("/", authenticateToken, coinHistoryRoutes);
app.use("/", authenticateToken, redeemRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
