require("dotenv").config();
const PORT = process.env.PORT;
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const coinHistoryRoutes = require("./routes/coin-history");
const redeemRoutes = require("./routes/redeem");
const middleware = require("./middleware/mid");
const { authenticateToken } = require("./middleware/mid");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/", userRoutes);
app.use("/", productRoutes);
app.use("/", coinHistoryRoutes);
app.use("/", redeemRoutes);
app.use("/", authenticateToken, productRoutes);
app.use("/", authenticateToken, cartRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
