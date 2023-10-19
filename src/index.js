const express = require('express');
const sequelize = require('./config/db');
const { DataTypes } = require('sequelize');
require('dotenv').config();
const cors = require('cors');

//IMPORTACIÓN DE RUTAS
const v1Justificativo = require('./V1/routes/justificativoRoutes');
const v1Dia = require('./V1/routes/diaRoutes');
const v1Profesor = require('./V1/routes/profesorRoutes');
const v1Curso = require('./V1/routes/cursoRoutes');
const v1User = require('./V1/routes/userRoutes');
const v1Rol = require('./V1/routes/rolRoutes');
const v1Bloque = require('./V1/routes/bloqueRoutes');
const v1Asistencia = require('./V1/routes/asistenciaRoutes');
const V1DetalleAsistencia = require('./V1/routes/detalleAsistenciaRoutes');
const v1Login = require('./V1/routes/loginRoutes');

const app = express();
const PORT = process.env.PORT || 3004;
app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  // Add other headers like methods, headers, etc. as needed
  next();
});

//RUTAS
app.use("/api/v1/auth", v1Login);
app.use("/api/v1/justificativo", v1Justificativo);
app.use("/api/v1/dia", v1Dia);
app.use("/api/v1/profesor", v1Profesor);
app.use("/api/v1/curso", v1Curso);
app.use("/api/v1/user", v1User);
app.use("/api/v1/rol", v1Rol);
app.use("/api/v1/bloque", v1Bloque);
app.use("/api/v1/asistencia", v1Asistencia);
app.use("/api/v1/detalleAsistencia", V1DetalleAsistencia);

app.listen(PORT, () => {
    testConnection();
    console.log(`Server listening on port ${PORT}`)
});

//probando extencion thunder client
app.get("/", (req, res) => {

  res.json({ message: "todo ok" });

});

//IMPORTAR LOS MODELOS 
const AlertaApoderadoModel = require('./models/alertaApoderadoModel');
const AlertaProfesorModel = require('./models/alertaProfesorModel');
const ApoderadoModel = require('./models/apoderadoModel');
const AsignaturaModel = require('./models/asignaturaModel');
const AsistenciaModel = require('./models/asistenciaModel');
const BloqueModel = require('./models/bloqueModel');
const CursoModel = require('./models/cursoModel');
const DetalleAsistenciaModel = require('./models/detalleAsistenciaModel');
const DiaModel = require('./models/diaModel');
const EstudianteModel = require('./models/estudianteModel');
const JustificativoModel = require('./models/justificativoModel');
const MatriculaModel = require('./models/matriculaModel');
const ProfesorModel = require('./models/profesorModel');
const RolesModel = require('./models/rolModel');
const UsersModel = require('./models/userModel');
const UsersRolesModel = require('./models/userRolesModel');

//DEFINICIÓN DE LOS MODELOS
const AlertaApoderado = new AlertaApoderadoModel(sequelize, DataTypes);
const AlertaProfesor = new AlertaProfesorModel(sequelize, DataTypes);
const Apoderado = new ApoderadoModel(sequelize, DataTypes);
const Asignatura= new AsignaturaModel(sequelize, DataTypes);
const Asistencia = new AsistenciaModel(sequelize, DataTypes);
const Bloque= new BloqueModel(sequelize, DataTypes);
const Curso= new CursoModel(sequelize, DataTypes);
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
      console.log('Conexión exitosa.');
    } catch (error) {
      console.error('Error al conectar:', error);
    }
  }
  
  