const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');
const Estudiante = require('./estudianteModel');
const AlertaApoderado = require('./alertaApoderadoModel');
const Justificativo = require('./justificativoModel');

const Apoderado = sequelize.define('Apoderados', {
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
  }
});

Apoderado.hasMany(Estudiante, {
  foreignKey: 'idApoderado',
  sourceKey: 'id'
});

Estudiante.belongsTo(Apoderado, {
  foreignKey: 'idApoderado',
  targetKey: 'id'
});

Apoderado.hasMany(AlertaApoderado, {
  foreignKey: 'idApoderado',
  sourceKey: 'id'
});

AlertaApoderado.belongsTo(Apoderado, {
  foreignKey: 'idApoderado',
  targetKey: 'id'
});

Apoderado.hasMany(Justificativo, {
  foreignKey: 'idApoderado',
  sourceKey: 'id'
});

Justificativo.belongsTo(Apoderado, {
  foreignKey: 'idApoderado',
  targetKey: 'id'
});


module.exports = Apoderado;












