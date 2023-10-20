const express = require("express");
const sequelize = require("./config/db");
const { DataTypes } = require("sequelize");
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3004;

const corsOptions = require("./config/corsOptions");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));

const router = require("./V1/routes");
app.use("/api/v1", router);

app.listen(PORT, () => {
  testConnection();
  console.log(`Server listening on port ${PORT}`);
});

//probando extencion thunder client
app.get("/", (req, res) => {
  res.json({ message: "todo ok" });
});

//IMPORTAR LOS MODELOS

const {
  alertaApoderado,
  alertaProfesor,
  apoderado,
  asignatura,
  asistencia,
  bloque,
  curso,
  detalleAsistencia,
  dia,
  estudiante,
  justificativo,
  matricula,
  profesor,
  profesorAsignatura,
  rol,
  user,
  escuela,
} = require("./models");

//DEFINICIÓN DE LOS MODELOS
const AlertaApoderado = new alertaApoderado(sequelize, DataTypes);
const AlertaProfesor = new alertaProfesor(sequelize, DataTypes);
const Apoderado = new apoderado(sequelize, DataTypes);
const Asistencia = new asistencia(sequelize, DataTypes);
const Bloque = new bloque(sequelize, DataTypes);
const Curso = new curso(sequelize, DataTypes);
const DetalleAsistencia = new detalleAsistencia(sequelize, DataTypes);
const Dia = new dia(sequelize, DataTypes);
const Estudiante = new estudiante(sequelize, DataTypes);
const Justificativo = new justificativo(sequelize, DataTypes);
const Matricula = new matricula(sequelize, DataTypes);
const Asignatura = new asignatura(sequelize, DataTypes);
const Profesor = new profesor(sequelize, DataTypes);
const ProfesorAsignatura = new profesorAsignatura(sequelize, DataTypes);

const User = new user(sequelize, DataTypes);
const Rol = new rol(sequelize, DataTypes);
const Escuela = new escuela(sequelize, DataTypes);

// (async () => {
//   try {
//     await sequelize.sync({ force: true }); // Opción force: true solo para desarrollo
//     console.log("Los modelos han sido sincronizados con la base de datos.");
//   } catch (error) {
//     console.error("Error al sincronizar los modelos:", error);
//   }
// })();

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Conexión exitosa.");
  } catch (error) {
    console.error("Error al conectar:", error);
  }
}
