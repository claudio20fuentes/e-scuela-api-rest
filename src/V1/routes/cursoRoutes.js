const express = require('express');
const router = express.Router();
const cursoController = require('../../controllers/cursoController');

router
    .get("/", cursoController.getAllCursos)

    .get("/:id", cursoController.getOnCurso)

    .post("/", cursoController.createCurso)

    .put("/:id", cursoController.updateCurso)

    .delete("/:id", cursoController.deleteCurso);

    module.exports = router;
