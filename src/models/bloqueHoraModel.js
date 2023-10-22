const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Bloque = require("./bloqueModel");

const BloqueHora = sequelize.define("BloquesHora", {
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
});

BloqueHora.hasMany(Bloque, {
  foreignKey: "idBloqueHora",
  sourceKey: "id",
});

Bloque.belongsTo(BloqueHora, {
  foreignKey: "idBloqueHora",
  targetKey: "id",
});

module.exports = BloqueHora;
