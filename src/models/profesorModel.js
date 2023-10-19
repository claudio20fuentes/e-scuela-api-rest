const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Asignatura = require('./asignaturaModel');
const Curso = require('./cursoModel');
const AlertaProfesor = require('./alertaProfesorModel');

const Profesor = sequelize.define('Profesores', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
});


Profesor.hasMany(Curso, {
  foreignKey: 'idProfesor',
  sourceKey: 'id'
});

Curso.belongsTo(Profesor, {
  foreignKey: 'idProfesor',
  targetKey: 'id'
});

Profesor.hasMany(AlertaProfesor, {
  foreignKey: 'idProfesor',
  sourceKey: 'id'
});

AlertaProfesor.belongsTo(Profesor, {
  foreignKey: 'idProfesor',
  targetKey: 'id'
});

module.exports = Profesor;
