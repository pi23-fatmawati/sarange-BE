require("dotenv").config();
const PORT = process.env.PORT;
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const redeemRoutes = require('./routes/redeem');
const coinHistoryRoutes = require('./routes/coin-history')
const middleware = require("./middleware/mid");
const { authenticateToken } = require("./middleware/mid");
const app = express();

app.use(bodyParser.json());
app.use("/", userRoutes);
app.use("/", productRoutes);
app.use("/", redeemRoutes);
app.use("/", coinHistoryRoutes);
app.use("/", authenticateToken, productRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
