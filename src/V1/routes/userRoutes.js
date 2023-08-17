const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

router
    .get("/", userController.getAllUsers)

    .get("/:id", userController.getOnUser)
    
    .post("/registrar", userController.createUser)//register
    
    .delete("/:id", userController.deleteUser)

    .post("/login", userController.login)
    
    .put("/:id", userController.updateUser);

    module.exports = router;