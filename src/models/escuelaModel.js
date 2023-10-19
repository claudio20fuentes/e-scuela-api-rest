const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');

const Escuela = sequelize.define('Escuela', {
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

Escuela.hasMany(User, {
  foreignKey: 'idEscuela',
  sourceKey: 'id'
})

User.belongsTo(Escuela, {
  foreignKey: 'idEscuela',
  targetKey: 'id'
})

module.exports = Escuela;