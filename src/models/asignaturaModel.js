const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Bloque = require('./bloqueModel');

const Asignatura = sequelize.define('Asignaturas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  idProfesor: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

Asignatura.hasMany(Bloque, {
  foreignKey: 'idAsignatura',
  sourceKey: 'id'
});

Bloque.belongsTo(Asignatura, {
  foreignKey: 'idAsignatura',
  targetKey: 'id'
});

module.exports = Asignatura;
