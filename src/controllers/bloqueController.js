const BloqueService = require('../services/bloqueService');

const getAllBloquesDiaCurso = async (req, res) => {

    try {
        const { idDia, idCurso } = req.params;

        if (!idDia || !idCurso) {
            return res.status(400).json({ error: "Faltan parámetros" });
        }

        const allBloques = await BloqueService.getAllBloquesDiaCurso(idDia, idCurso);

        if (!allBloques || allBloques === 0) return res.status(404).json({ error: "No se encontraron bloques" });

        res.status(200).json({ succes: true, data: allBloques });

    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }

};

const createBloque = async (req, res) => {

    const dataBloque = req.body;

    try {

        const bloque = await BloqueService.createBloque(dataBloque);
        res.status(201).json({ succces: true, data: bloque });

    } catch (error) {
        console.error('Error al crear el bloque:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }

};

const updateBloque = async (req, res) => {

    const idBloque = req.params.id;
    const data = req.body;

    try {
        
        const update = await BloqueService.updateBloque(idBloque, data);
        if (update) {
            res.status(200).json({ succes: true, message: 'Bloque actualizado correctamente', data: update });
            
        }else{
            res.status(404).json({ error: 'Bloque no encontrado' });

        }

    } catch (error) {
        console.error(`Error al editar el bloque con ID ${idBloque}:`, error);
        res.status(500).json({ error: 'Error en el servidor' });
    }

};



const deleteAllBloquesDiaCurso = async (req, res) => {

    const { idDia, idCurso } = req.params;

    try {

        const bloques = await BloqueService.deleteAllBloquesDiaCurso(idDia, idCurso);
        
        res.status(201).json({ succces: true, message: "Bloques eliminados correctamente", data: bloques });


    } catch (error) {

        console.error('Error al crear el bloque:', error);
        res.status(500).json({ error: 'Error en el servidor' });

    }

};

const deleteBloque = async (req, res) => {
    
    const id = req.params;

    try {
        
        const bloque = await BloqueService.deleteBloque(id);

        res.status(201).json({ succces: true, message: "Bloque eliminado correctamente", data: bloque });

    } catch (error) {
       
        console.error('Error al crear el bloque:', error);
        res.status(500).json({ error: 'Error en el servidor' });

    }

}

module.exports = {
    createBloque,
    getAllBloquesDiaCurso,
    deleteAllBloquesDiaCurso,
    updateBloque,
    deleteBloque
};