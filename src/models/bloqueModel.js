const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Asistencia = require("./asistenciaModel");

const Bloque = sequelize.define("Bloques", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  idBloqueHora: {
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
  sourceKey: "id",
});

module.exports = Bloque;
