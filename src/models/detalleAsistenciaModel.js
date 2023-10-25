const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const AlertaProfesor = require('./alertaProfesorModel');
const AlertaApoderado = require('./alertaApoderadoModel');
const Justificativo = require('./justificativoModel');

const DetalleAsistencia = sequelize.define('DetallesAsistencias', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  estado: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  idMatricula: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idEscuela: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idAsistencia: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

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

module.exports = DetalleAsistencia;
