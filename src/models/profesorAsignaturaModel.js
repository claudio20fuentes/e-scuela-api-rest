const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Asignatura = require('./asignaturaModel');
const Profesor = require('./profesorModel');

const ProfesorAsignatura = sequelize.define('ProfesoresAsignaturas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
});

Profesor.belongsToMany(Asignatura, {
  through: ProfesorAsignatura,
  foreignKey: 'idProfesor',     // Name of the foreign key in the join table
  otherKey: 'idAsignatura'  
});

Asignatura.belongsToMany(Profesor, {
  through: ProfesorAsignatura,
  foreignKey: 'idAsignatura',
  otherKey: 'idProfesor' 
});

module.exports = ProfesorAsignatura;
