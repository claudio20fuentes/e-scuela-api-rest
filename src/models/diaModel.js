const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');
const Bloque = require('./bloqueModel');


const Dia = sequelize.define('Dias', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Dia.hasMany(Bloque, {
  foreignKey: 'idDia',
  sourceKey: 'id'
});

Bloque.belongsTo(Dia, {
  foreignKey: 'idDia',
  targetKey: 'id'
});

module.exports = Dia;
