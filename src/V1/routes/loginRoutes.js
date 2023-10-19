const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');

router
    
    .post("/", authController.login)

    .post("/registrar", authController.createUser)
    

    module.exports = router;