const express = require('express');
const router = express.Router();
const bloqueController = require('../../controllers/bloqueController');

router
    .get("/:idDia/:idCurso", bloqueController.getAllBloquesDiaCurso)
    
    // .get("/:id", bloqueController.getOnBloque)
    
    .post("/", bloqueController.createBloque)
    
    .delete("/:idDia/:idCurso", bloqueController.deleteAllBloquesDiaCurso)

    .put("/:id", bloqueController.updateBloque);

    module.exports = router;