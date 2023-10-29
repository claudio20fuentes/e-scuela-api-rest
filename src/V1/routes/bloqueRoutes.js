const express = require('express');
const router = express.Router();
const bloqueController = require('../../controllers/bloqueController');

router
    .get("/", bloqueController.getBloques)
    
    .get("/:id", bloqueController.getBloqueById)
    
    .post("/", bloqueController.createBloque)
    
    .delete("/:idDia/:idCurso", bloqueController.deleteAllBloquesDiaCurso)

    .delete("/:id", bloqueController.deleteBloque)

    .put("/:id", bloqueController.updateBloque);

    module.exports = router;