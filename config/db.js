// db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nombre-de-tu-base-de-datos', 'tu-usuario', 'tu-contraseña', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
