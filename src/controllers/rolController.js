const RolService = require('../services/rolService');

const getAllRoles = async (req, res) => {

    try {
        
        const allRoles = await RolService.getAllRoles();

        if (!allRoles || allRoles === 0) {

            return res.status(404).json({ error: "No se encontraron roles" });
            
        }

        res.status(200).json({ succes: true, data: allRoles });


    } catch (error) {

        res.status(500).json({ error: "Error en el servidor" });
        
    }

};

module.exports = {
    getAllRoles
}

