require("dotenv").config();
const PORT = process.env.PORT;
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const middleware = require("./middleware/mid");
const app = express();

app.use(bodyParser.json());
app.use(middleware);
app.use("/", userRoutes);
app.use("/", productRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
