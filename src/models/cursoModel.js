const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');
const Bloque = require('./bloqueModel');

const Curso = sequelize.define('Cursos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombreCurso: {
    type: DataTypes.STRING,
    allowNull: false
  },
  idProfesor: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

Curso.hasMany(Bloque, {
  foreignKey: 'idCurso',
  sourceKey: 'id'
});

Bloque.belongsTo(Curso, {
  foreignKey: 'idCurso',
  targetKey: 'id'
});

module.exports = Curso;
