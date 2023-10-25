const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const DetalleAsistencia = require("./detalleAsistenciaModel");

const Asistencia = sequelize.define("Asistencia", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  // estado: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  // },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  idBloque: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Asistencia.hasMany(DetalleAsistencia, {
  foreignKey: "idAsistencia",
  sourceKey: "id",
});

DetalleAsistencia.belongsTo(Asistencia, {
  foreignKey: "idAsistencia",
  sourceKey: "id",
});

module.exports = Asistencia;
