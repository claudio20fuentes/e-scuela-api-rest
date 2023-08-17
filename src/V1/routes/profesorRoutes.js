const express = require('express');
const router = express.Router();
const profersorController = require('../../controllers/profesorController');

router
    .get("/", profersorController.getAllProfesores)
    
    .get("/:id", profersorController.getOnProfesor)

    .post("/",profersorController.createProfesor)
    
    .delete("/:id", profersorController.deleteProfesor)
    
    .put("/:id", profersorController.updateProfesor);

    module.exports = router;