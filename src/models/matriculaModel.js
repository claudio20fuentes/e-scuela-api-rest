const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Estudiante = require('./estudianteModel');
const Curso = require('./cursoModel');

const Matricula = sequelize.define('Matriculas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  año: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fechaMatricula: {
    type: DataTypes.DATE,
    allowNull: false
  },
  // idEstudiante: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false
  // },
  // idCurso: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false
  // }
});

Estudiante.belongsToMany(Curso, {
  through: Matricula
});

Curso.belongsToMany(Estudiante, {
  through: Matricula
});


module.exports = Matricula;
