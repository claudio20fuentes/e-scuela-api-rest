const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Asistencia = sequelize.define('Asistencias', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idBloque: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Asistencia;