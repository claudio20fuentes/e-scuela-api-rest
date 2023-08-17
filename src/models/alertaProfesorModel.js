const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const AlertaProfesor = sequelize.define('AlertasProfesores', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tipo: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  estado: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idDetalleAsistencia: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idProfesor: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = AlertaProfesor;
