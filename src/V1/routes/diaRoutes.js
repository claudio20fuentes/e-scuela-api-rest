const express = require('express');
const router = express.Router();
const diaController = require('../../controllers/diaController');

router
    .get("/", diaController.getAllDia)

    .get("/:id", diaController.getOneDia);
    
    module.exports = router;