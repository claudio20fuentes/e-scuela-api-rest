const alertaApoderado = require('./alertaApoderadoModel');
const alertaProfesor = require('./alertaProfesorModel');
const apoderado = require('./apoderadoModel');
const detalleAsistencia = require('./detalleAsistenciaModel');
const bloqueHora = require('./bloqueHoraModel');
const bloque = require('./bloqueModel');
const curso = require('./cursoModel');
const asignatura = require('./asignaturaModel');
const dia = require('./diaModel');
const estudiante = require('./estudianteModel');
const justificativo = require('./justificativoModel');
const matricula = require('./matriculaModel');
const profesor = require('./profesorModel');
const rol = require('./rolModel');
const user = require('./userModel');
const escuela = require('./escuelaModel');
const profesorAsignatura = require('./profesorAsignaturaModel');

const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const startDatabase = () => {
new alertaApoderado(sequelize, DataTypes);
new alertaProfesor(sequelize, DataTypes);
new apoderado(sequelize, DataTypes);
new bloqueHora(sequelize, DataTypes);
new curso(sequelize, DataTypes);
new bloque(sequelize, DataTypes);
new detalleAsistencia(sequelize, DataTypes);
new dia(sequelize, DataTypes);
new estudiante(sequelize, DataTypes);
new justificativo(sequelize, DataTypes);
new matricula(sequelize, DataTypes);
new asignatura(sequelize, DataTypes);
new profesor(sequelize, DataTypes);
new profesorAsignatura(sequelize, DataTypes);

new user(sequelize, DataTypes);
new rol(sequelize, DataTypes);
new escuela(sequelize, DataTypes);
}

module.exports = startDatabase;