const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Asistencia = require('./asistenciaModel');

const Bloque = sequelize.define('Bloques', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  horaInicio: {
    type: DataTypes.TIME,
    allowNull: false
  },
  horaFin: {
    type: DataTypes.TIME,
    allowNull: false
  },
  idDia: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idAsignatura: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idCurso: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

Bloque.hasMany(Asistencia, {
  foreignKey: 'idBloque',
  sourceKey: 'id'
});

Asistencia.belongsTo(Bloque, {
  foreignKey: 'idBloque',
  targetKey: 'id'
});

module.exports = Bloque;
