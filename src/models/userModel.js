const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');

const Users = sequelize.define('Users',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    movil: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Users;
