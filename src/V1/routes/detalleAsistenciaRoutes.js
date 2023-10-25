const express = require("express");
const router = express.Router();
const detalleAsistenciaController = require("../../controllers/detalleAsistenciaController");

router
  .get("/", detalleAsistenciaController.getDetalleAsistencia)
  .post("/", detalleAsistenciaController.createDetalleAsistencia);

module.exports = router;
