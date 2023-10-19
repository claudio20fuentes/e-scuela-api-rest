const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');
const Rol = require('./rolModel');
const User = require('./userModel');

const UsersRoles = sequelize.define('UsersRoles', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idUser: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idRol: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

Rol.belongsToMany(User, {
  through: UsersRoles,
  foreignKey: 'idRol'
});

User.belongsToMany(Rol, {
  through: UsersRoles,
  foreignKey: 'idUser'
});

module.exports = UsersRoles;