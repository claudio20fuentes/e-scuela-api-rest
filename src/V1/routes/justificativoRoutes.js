const express = require('express');
const router = express.Router();
const justificativoController = require('../../controllers/justificativoController');

router
    .get("/", justificativoController.getAllJustificativo)

    .get("/:justificativo", justificativoController.getOneJustificativo)

    .post("/:justificativoId", justificativoController.createNewJustificativo)

    .patch("/:justificativoId", justificativoController.updateOneJustificativo)

    .delete("/:justificativoId", justificativoController.deleteOnJustificativo);

    module.exports = router;