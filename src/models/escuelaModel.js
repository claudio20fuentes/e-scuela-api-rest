const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');
const Asignatura = require('./asignaturaModel');
const Bloque = require('./bloqueModel');
const Curso = require('./cursoModel');
const Estudiante = require('./estudianteModel');
const Matricula = require('./matriculaModel');
const detalleAsistencia = require('./detalleAsistenciaModel');
const DetalleAsistencia = require('./detalleAsistenciaModel');
const Asistencia = require('./asistenciaModel');

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

Escuela.hasMany(Asignatura, {
  foreignKey: 'idEscuela',
  sourceKey: 'id'
})

Asignatura.belongsTo(Escuela, {
  foreignKey: 'idEscuela',
  targetKey: 'id'
})

Escuela.hasMany(Bloque, {
  foreignKey: 'idEscuela',
  sourceKey: 'id'
})

Bloque.belongsTo(Escuela, {
  foreignKey: 'idEscuela',
  targetKey: 'id'
})

Escuela.hasMany(Curso, {
  foreignKey: 'idEscuela',
  sourceKey: 'id'
})

Curso.belongsTo(Escuela, {
  foreignKey: 'idEscuela',
  targetKey: 'id'
})

Escuela.hasMany(Estudiante, {
  foreignKey: 'idEscuela',
  sourceKey: 'id'
})

Estudiante.belongsTo(Escuela, {
  foreignKey: 'idEscuela',
  targetKey: 'id'
})

Escuela.hasMany(Matricula, {
  foreignKey: 'idEscuela',
  sourceKey: 'id'
})

Matricula.belongsTo(Escuela, {
  foreignKey: 'idEscuela',
  targetKey: 'id'
})

Escuela.hasMany(DetalleAsistencia, {
  foreignKey: 'idEscuela',
  sourceKey: 'id'
})

DetalleAsistencia.belongsTo(Escuela, {
  foreignKey: 'idEscuela',
  targetKey: 'id'
})

Escuela.hasMany(Asistencia, {
  foreignKey: 'idEscuela',
  sourceKey: 'id'
})

Asistencia.belongsTo(Escuela, {
  foreignKey: 'idEscuela',
  targetKey: 'id'
})

module.exports = Escuela;