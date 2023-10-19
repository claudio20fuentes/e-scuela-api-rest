const userService = require('../services/userService');
// const UserService = require('../services/userService');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// TRAE TODOS LOS USUARIOS REGISTRADOS
const getAllUsers = async (req, res) => {

    try {

        const allUsers = await UserService.getAllUsers();

        if (!allUsers || allUsers.length === 0) {
            
            return res.status(404).json({ error: "No se encontraron usuarios"});

        }

        res.status(200).json({ succes: true, data: allUsers});
        
    } catch (error) {
        
        res.status(500).json({ error: "Error en el servidor" });
        
    }
};

// TRAE UN USUARIO DE LA APP, FREQUIERE COMO PARAMETRO EL ID DEL USUARIO
const getOnUser = async (req, res) => {

    const userId = req.params.id;
    const user = await UserService.getOnUser(userId);

    try {
    
        if (!user) {
            
            return res.status(404).json({ succes: false, error: 'User no encontrado' });

        }

        res.status(200).json({ succes: true, data: user });


    } catch (error) {

        res.status(500).json({ error: 'Error en el servidor' });
        
    }
}
// CREAR USUARIO, A TRAVÉS DEL BODY DE LA SOLICITUD

const createUser = async (req, res) => {

    const dataUser = req.body;
    const roleId = req.body.roleId;
    

    try {

        const result = await UserService.createUser(dataUser, roleId);

        if (result.succes) {
            res.status(201).json({ succes: true, data: result.data, caca: "caca" })
            
        }else{
            res.status(400).json({ succes: false, errors: result.errors})
            return result;
        }
        
    } catch (error) {
       
        console.error('Error al crear el user', error);
        res.status(500).json({ error: "Error de servidor" });

    }
}


const login = async (req, res) => {

    const { correo, contrasena } = req.body;

    try {
        const user = await userService.authenticateUser(correo, contrasena);
        if (!user) {
            return res.status(401).json({ error: "Credenciales inválidas"});   
        };

        const payload = {
            userId: user.id,
            correo: user.correo
        };

        const keyLength = 32;
        const secretKey = crypto.randomBytes(keyLength).toString('hex');
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
        // Generar el token de acceso utilizando JWT o cualquier otra técnica de autenticación
        // Puedes implementar una función que genere y firme el token con los datos del usuario

        res.status(200).json({ success: true, token: token });

    } catch (error) {
        console.error('Error al autenticar el usuario:', error);
        res.status(500).json({ error: 'Error en el servidor' });       
    }
    
}

const updateUser = async (req, res) => {

    const userId = req.params.id;
    const data = req.body;

    try {

        const update = await UserService.updateUser(userId, data);
        if (update) {
            
            res.status(200).json({ succes: true, message: 'User actualizado correctamente' })

        }else{

            res.status(404).json({ error: 'User no encontrado' });

        }
        
    } catch (error) {

        console.error(`Error al editar el user con ID ${userId}:`, error);
        res.status(500).json({ error: 'Error en el servidor' });
        
    }
}

const deleteUser = async (req, res) => {

    const id = req.params.id;

    try {

        const user = await UserService.deleteUser(id);

        if (!user){

            return res.status(404).json({ error: 'User no encontrado' });

        }

        res.status(200).json({ succes: true, data: 'User eliminado correctamente' });
        

    } catch (error) {

        res.status(500).json({ error: 'Error en el servidor' });
        
    }
}


module.exports = {

    getAllUsers,
    getOnUser,
    createUser,
    updateUser,
    deleteUser,
    login

};