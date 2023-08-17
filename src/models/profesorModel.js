const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const Asignatura = require('./asignaturaModel');
const Curso = require('./cursoModel');
const AlertaProfesor = require('./alertaProfesorModel');

const Profesor = sequelize.define('Profesores', {
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
  correo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  movil: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Profesor.hasMany(Asignatura, {
  foreignKey: 'idProfesor',
  sourceKey: 'id'
});

Asignatura.belongsTo(Profesor, {
  foreignKey: 'idProfesor',
  targetKey: 'id'
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
