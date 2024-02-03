require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME || "freedb_sarange_be",
    password: process.env.DB_PASSWORD || "b6VjMGx4@r5W##N",
    database: process.env.DB_NAME || "freedb_sarange_be",
    host: process.env.DB_HOST || "sql.freedb.tech",
    dialect: "mysql",
  },
  test: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || "database_test",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: process.env.DB_USERNAME || "freedb_sarange_be",
    password: process.env.DB_PASSWORD || "b6VjMGx4@r5W##N",
    database: process.env.DB_NAME || "freedb_sarange_be",
    host: process.env.DB_HOST || "sql.freedb.tech",
    dialect: "mysql",
  },
};