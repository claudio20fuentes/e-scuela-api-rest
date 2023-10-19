const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

const connection = {
  development: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: "3306",
  },
};

module.exports = connection;
