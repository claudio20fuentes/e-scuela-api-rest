const express = require("express");
const sequelize = require("./config/db");
const { DataTypes } = require("sequelize");
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3004;

const corsOptions = require('./config/corsOptions');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors(corsOptions));

const router = require('./V1/routes');
app.use('/api/v1', router);

app.listen(PORT, () => {
  testConnection();
  console.log(`Server listening on port ${PORT}`);
});

//probando extencion thunder client
app.get("/", (req, res) => {
  res.json({ message: "todo ok" });
});

//IMPORTAR LOS MODELOS
const AlertaApoderadoModel = require("./models/alertaApoderadoModel");
const AlertaProfesorModel = require("./models/alertaProfesorModel");
const ApoderadoModel = require("./models/apoderadoModel");
const AsignaturaModel = require("./models/asignaturaModel");
const AsistenciaModel = require("./models/asistenciaModel");
const BloqueModel = require("./models/bloqueModel");
const CursoModel = require("./models/cursoModel");
const DetalleAsistenciaModel = require("./models/detalleAsistenciaModel");
const DiaModel = require("./models/diaModel");
const EstudianteModel = require("./models/estudianteModel");
const JustificativoModel = require("./models/justificativoModel");
const MatriculaModel = require("./models/matriculaModel");
const ProfesorModel = require("./models/profesorModel");
const RolesModel = require("./models/rolModel");
const UsersModel = require("./models/userModel");
const UsersRolesModel = require("./models/userRolesModel");

//DEFINICIÓN DE LOS MODELOS
const AlertaApoderado = new AlertaApoderadoModel(sequelize, DataTypes);
const AlertaProfesor = new AlertaProfesorModel(sequelize, DataTypes);
const Apoderado = new ApoderadoModel(sequelize, DataTypes);
const Asignatura = new AsignaturaModel(sequelize, DataTypes);
const Asistencia = new AsistenciaModel(sequelize, DataTypes);
const Bloque = new BloqueModel(sequelize, DataTypes);
const Curso = new CursoModel(sequelize, DataTypes);
const DetalleAsistencia = new DetalleAsistenciaModel(sequelize, DataTypes);
const Dia = new DiaModel(sequelize, DataTypes);
const Estudiante = new EstudianteModel(sequelize, DataTypes);
const justificativo = new JustificativoModel(sequelize, DataTypes);
const matricula = new MatriculaModel(sequelize, DataTypes);
const profesor = new ProfesorModel(sequelize, DataTypes);

const User = new UsersModel(sequelize, DataTypes);
const Rol = new RolesModel(sequelize, DataTypes);
const UserRol = new UsersRolesModel(sequelize, DataTypes);

// (async () => {
//   try {
//     await sequelize.sync({ force: true }); // Opción force: true solo para desarrollo
//     console.log('Los modelos han sido sincronizados con la base de datos.');
//   } catch (error) {
//     console.error('Error al sincronizar los modelos:', error);
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
