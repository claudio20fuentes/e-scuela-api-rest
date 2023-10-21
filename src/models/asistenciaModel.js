const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Asistencia = sequelize.define("Asistencias", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idBloque: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idEscuela: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Asistencia;
