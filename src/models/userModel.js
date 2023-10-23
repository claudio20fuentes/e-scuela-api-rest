const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Apoderado = require('./apoderadoModel');
const Profesor = require('./profesorModel');
const Rol = require('./rolModel');

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
    },
    idRol: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idEscuela: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

Users.hasOne(Apoderado, {
    foreignKey: 'idUsuario',
    sourceKey: 'id'
})

Apoderado.belongsTo(Users, {
    foreignKey: 'idUsuario',
    targetKey: 'id'
})

Users.hasOne(Profesor, {
    foreignKey: 'idUsuario',
    sourceKey: 'id'
})

Profesor.belongsTo(Users, {
    foreignKey: 'idUsuario',
    targetKey: 'id'
})

Users.belongsTo(Rol, {
    foreignKey: 'idRol',
    targetKey: 'id'
})

Rol.hasMany(Users, {
    foreignKey: 'idRol',
    sourceKey: 'id'
})


module.exports = Users;
