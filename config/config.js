// {
//   "development": {
//     "username": "root",
//     "password": "Fatmawati3",
//     "database": "sarange_online",
//     "host": "localhost",
//     "dialect": "mysql"
//   },
//   "test": {
//     "username": "root",
//     "password": null,
//     "database": "database_test",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "production": {
//     "username": "root",
//     "password": null,
//     "database": "database_production",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   }
// }

require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME || "freedb_be_fatmawati_user",
    password: process.env.DB_PASSWORD || "T&*af9H6Y%PZSuf",
    database: process.env.DB_NAME || "freedb_be_fatmawati",
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
    username: process.env.DB_USERNAME || "freedb_be_fatmawati_user",
    password: process.env.DB_PASSWORD || "T&*af9H6Y%PZSuf",
    database: process.env.DB_NAME || "freedb_be_fatmawati",
    host: process.env.DB_HOST || "sql.freedb.tech",
    dialect: "mysql",
  },
};
