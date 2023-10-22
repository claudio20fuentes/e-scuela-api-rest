const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

router
    .get("/", userController.getAllUsers)

    .get("/:id", userController.getOnUser)
    
    .post("/", userController.createUser)
    
    .delete("/:id", userController.deleteUser)
    
    .put("/:id", userController.updateUser);

    module.exports = router;