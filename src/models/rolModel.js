const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Roles = sequelize.define('Roles', {
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

module.exports = Roles;