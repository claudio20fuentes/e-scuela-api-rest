const express = require("express");
const router = express.Router();
const loginRoutes = require("./loginRoutes");
const alertaApoderadoRoutes = require("./alertaApoderadoRoutes");
const alertaProfesorRoutes = require("./alertaProfesorRoutes");
const apoderadoRoutes = require("./apoderadoRoutes");
const asignaturaRoutes = require("./asignaturaRoutes");
const asistenciaRoutes = require("./asistenciaRoutes");
const bloqueRoutes = require("./bloqueRoutes");
const cursoRoutes = require("./cursoRoutes");
const detalleAsistenciaRoutes = require("./detalleAsistenciaRoutes");
const diaRoutes = require("./diaRoutes");
const estudianteRoutes = require("./estudianteRoutes");
const justificativoRoutes = require("./justificativoRoutes");
const matriculaRoutes = require("./matriculaRoutes");
const profesorRoutes = require("./profesorRoutes");
const rolRoutes = require("./rolRoutes");
const userRoutes = require("./userRoutes");
const authenticateToken = require("../../middlewares/session");

router.use("/auth", loginRoutes);

router.use("/alertaApoderados", alertaApoderadoRoutes);
router.use("/alertaProfesores", alertaProfesorRoutes);
router.use("/apoderados", apoderadoRoutes);
router.use("/asignaturas", asignaturaRoutes);
router.use("/asistencias", asistenciaRoutes);
router.use("/bloques", bloqueRoutes);
router.use("/cursos", cursoRoutes);
router.use("/detalleAsistencia", detalleAsistenciaRoutes);
router.use("/dias", diaRoutes);
router.use("/estudiantes", estudianteRoutes);
router.use("/justificativos", justificativoRoutes);
router.use("/matriculas", matriculaRoutes);
router.use("/profesores", authenticateToken, profesorRoutes);
router.use("/roles", rolRoutes);
router.use("/users", userRoutes);

module.exports = router;
