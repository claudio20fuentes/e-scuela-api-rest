const userService = require('../services/userService');
const UserService = require('../services/userService');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const createUser = async (req, res) => {

    const dataUser = req.body;
    const roleId = req.body.roleId;

    try {

        const user = await UserService.createUser(dataUser, roleId);
        res.status(201).json({ succes: true, data: user });
        return user;
        
    } catch (error) {
       
        console.error('Error al crear el user', error);
        res.status(500).json({ error: 'Error en el servidor' });

    }
}

const login = async (req, res) => {

    const { user: correo, password: contrasena } = req.body;

    try {
        const user = await userService.authenticateUser(correo, contrasena);
        if (!user) {
            return res.status(401).json({ error: "Credenciales inválidas"});   
        };

        const payload = {
            userId: user.id,
            name: user.nombre + ' ' + user.apellidos || '',
            mail: user.correo,
            role: user.idRol,
            phone: user.movil,
            school: user.idEscuela,
            teacher: user?.Profesore?.id || false,
            parent: user?.Apoderado?.id || false,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        // Generar el token de acceso utilizando JWT o cualquier otra técnica de autenticación
        // Puedes implementar una función que genere y firme el token con los datos del usuario

        res.status(200).json({ success: true, token });

    } catch (error) {
        console.error('Error al autenticar el usuario:', error);
        res.status(500).json({ error: 'Error en el servidor' });       
    }
    
}

module.exports = {
    createUser,
    login
};