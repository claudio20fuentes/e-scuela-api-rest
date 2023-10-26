const express = require("express");
const router = express.Router();
const asistenciaController = require("../../controllers/asistenciaController");

router
  .post("/", asistenciaController.createAsistencia);

module.exports = router;
