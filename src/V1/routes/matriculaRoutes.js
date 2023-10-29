const express = require('express');
const router = express.Router();
module.exports = router;
const matriculasController = require('../../controllers/matriculaController')

router
    .get("/", matriculasController.getAllMatriculas)
    .get("/:id", matriculasController.getMatriculaById)
    .post("/", matriculasController.createMatricula)
    .put("/:id", matriculasController.updateMatricula);