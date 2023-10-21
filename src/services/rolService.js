const Rol = require('../models/rolModel');

class RolService{

    async getAllRoles( idEscuela ){
        try {
            const result = await Rol.findAll();
            return result;
        } catch (error) {
            console.error('Error al obtener los roles');
        }
    }
    
}

module.exports = new RolService();