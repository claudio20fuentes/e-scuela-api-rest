const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Estudiante = require('./estudianteModel');
const Curso = require('./cursoModel');
const DetalleAsistencia = require('./detalleAsistenciaModel');

const Matricula = sequelize.define('Matriculas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fechaMatricula: {
    type: DataTypes.DATE,
    allowNull: false
  },
  idEscuela: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idEstudiante: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idCurso: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

Estudiante.hasMany(Matricula, {
  foreignKey: 'idEstudiante',
  sourceKey: 'id'
});

Matricula.belongsTo(Estudiante, { 
  foreignKey: 'idEstudiante',
  sourceKey: 'id' 
});

Matricula.belongsTo(Curso, {
  foreignKey: 'idCurso'
});

Curso.hasMany(Matricula, {
  foreignKey: 'idCurso',
  sourceKey: 'id'
});

// Estudiante.belongsToMany(Curso, {
//   through: Matricula,
//   foreignKey: 'idEstudiante',     // Name of the foreign key in the join table
//   otherKey: 'idCurso' 
// });

// Curso.belongsToMany(Estudiante, {
//   through: Matricula,
//   foreignKey: 'idCurso',     // Name of the foreign key in the join table
//   otherKey: 'idEstudiante'
// });

Matricula.hasMany(DetalleAsistencia, {
  foreignKey: 'idMatricula',
  sourceKey: 'id'
});

DetalleAsistencia.belongsTo(Matricula, {
  foreignKey: 'idMatricula',
  targetKey: 'id'
});


module.exports = Matricula;
