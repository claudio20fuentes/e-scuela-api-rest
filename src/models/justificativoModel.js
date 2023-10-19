const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Justificativo = sequelize.define('Justificativos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  archivo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  idApoderado: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idDetalleAsistencia: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});


module.exports = Justificativo;
