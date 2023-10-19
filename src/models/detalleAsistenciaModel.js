const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');
const AlertaProfesor = require('./alertaProfesorModel');
const AlertaApoderado = require('./alertaApoderadoModel');
const Justificativo = require('./justificativoModel');
const Asistencia = require('./asistenciaModel');
const Matricula = require('./matriculaModel');

const DetalleAsistencia = sequelize.define('DetallesAsistencias', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  presente: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ausente: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  atraso: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idAsistencia: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idMatricula: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

DetalleAsistencia.hasMany(AlertaProfesor, {
  foreignKey: 'idDetalleAsistencia',
  sourceKey: 'id'
});

AlertaProfesor.belongsTo(DetalleAsistencia, {
  foreignKey: 'idDetalleAsistencia',
  targetKey: 'id'
});

DetalleAsistencia.hasMany(AlertaApoderado, {
  foreignKey: 'idDetalleAsistencia',
  sourceKey: 'id'
});

AlertaApoderado.belongsTo(DetalleAsistencia, {
  foreignKey: 'idDetalleAsistencia',
  targetKey: 'id'
});

DetalleAsistencia.hasOne(Justificativo, {
  foreignKey: 'idDetalleAsistencia',
  sourceKey: 'id'
});

Justificativo.belongsTo(DetalleAsistencia, {
  foreignKey: 'idDetalleAsistencia',
  targetKey: 'id'
});

Asistencia.belongsToMany(Matricula, {
  through: DetalleAsistencia
});

Matricula.belongsToMany(Asistencia, {
  through: DetalleAsistencia
});

module.exports = DetalleAsistencia;
