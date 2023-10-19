const express = require('express');
const router = express.Router();
const detalleAsistenciaController = require('../../controllers/detalleAsistenciaController');

router
    .post("/", detalleAsistenciaController.createDetalleAsistencia);

module.exports = router;