const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Asistencia = require("./asistenciaModel");

const Bloque = sequelize.define("Bloques", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  horaInicio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  horaFin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idDia: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idAsignatura: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idCurso: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idEscuela: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idProfesor: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Bloque.hasMany(Asistencia, {
  foreignKey: "idBloque",
  sourceKey: "id",
});

Asistencia.belongsTo(Bloque, {
  foreignKey: "idBloque",
  targetKey: "id",
});

module.exports = Bloque;
