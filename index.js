require("dotenv").config();
const PORT = process.env.PORT;
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const { authenticateToken } = require("./middleware/mid");

const app = express();

app.use(bodyParser.json());
app.use("/", userRoutes);
app.use("/", authenticateToken, productRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
