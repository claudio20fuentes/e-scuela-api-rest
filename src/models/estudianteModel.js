const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Estudiante = sequelize.define('Estudiantes',{

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rut: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idApoderado: {
        type: DataTypes.INTEGER,
        defaultValue: null
    }

});


module.exports = Estudiante;



























