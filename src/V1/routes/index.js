const express = require("express");
const router = express.Router();
const loginRoutes = require("./loginRoutes");
const alertaApoderadoRoutes = require("./alertaApoderadoRoutes");
const alertaProfesorRoutes = require("./alertaProfesorRoutes");
const apoderadoRoutes = require("./apoderadoRoutes");
const asignaturaRoutes = require("./asignaturaRoutes");
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
const asistenciaRoutes = require("./asistenciaRoutes");
const authenticateToken = require("../../middlewares/session");

router.use("/auth", loginRoutes);

router.use("/alertaApoderados", authenticateToken, alertaApoderadoRoutes);
router.use("/alertaProfesores", authenticateToken, alertaProfesorRoutes);
router.use("/apoderados", authenticateToken, apoderadoRoutes);
router.use("/asignaturas", authenticateToken, asignaturaRoutes);
// router.use("/asistencias", authenticateToken, asistenciaRoutes);
router.use("/bloques", authenticateToken, bloqueRoutes);
router.use("/cursos", authenticateToken, cursoRoutes);
router.use("/asistencia", authenticateToken, detalleAsistenciaRoutes);
router.use("/dias", authenticateToken, diaRoutes);
router.use("/estudiantes", authenticateToken, estudianteRoutes);
router.use("/justificativos", authenticateToken, justificativoRoutes);
router.use("/matriculas", authenticateToken, matriculaRoutes);
router.use("/profesores", authenticateToken, profesorRoutes);
router.use("/roles", authenticateToken, rolRoutes);
router.use("/users", authenticateToken, userRoutes);

module.exports = router;
