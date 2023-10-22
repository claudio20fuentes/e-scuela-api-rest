const ProfesorService = require('../services/profesorService');

const getAllProfesores = async (req, res) => {

    try {

        const allProfesores = await ProfesorService.getAllProfesores(req);

        if (!allProfesores || allProfesores.length === 0) {
            
            return res.status(404).json({ error: "No se encontraron profesores" });

        }

        res.status(200).json({ succes: true, body: allProfesores });

    } catch (error) {

        res.status(500).json({ error: "Error en el servidor" });

    }
};

const getOnProfesor = async (req, res) => {

    const profesorId = req.params.id;
    const { school: idEdcuela } = req.user;
    const profesor = await ProfesorService.getOnProfesor(idEdcuela, profesorId);

    try {

        if (!profesor) {
            
            return res.status(404).json({ error: 'Profesor no encontrado' });
        
        }

        res.status(200).json({ succes: true, body: profesor });

    } catch (error) {

        res.status(500).json({ error: 'Error en el servidor' });

    }
};

const createProfesor = async (req, res) => {

    const dataProfesor = req.body;

    try {
        
        const profesor = await ProfesorService.createProfesor(dataProfesor);
        res.status(201).json({ succes: true, data: profesor });
    
    } catch (error) {
       
        console.error('Error al crear el profesor:', error);
        res.status(500).json({ error: 'Error en el servidor' });
   
    }

};

const updateProfesor = async (req, res) => {

    const profesorId = req.params.id;
    const data = req.body;

    try {
        
        const update = await ProfesorService.updateProfesor(profesorId, data);
        if (update) {
            
            res.status(200).json({ succes: true, message: 'Profesor actualizado correctamente' });
        
        } else {
           
            res.status(404).json({ error: 'Profesor no encontrado' });
       
        }
        
    } catch (error) {
        
        console.error(`Error al editar el profesor con ID ${profesorId}:`, error);
        res.status(500).json({ error: 'Error en el servidor' });
    
    }

};

const deleteProfesor = async (req, res) => {

    const id = req.params.id;

    try {

        const profesor = await ProfesorService.deleteProfesor(id);

        if (!profesor) {
            
            return res.status(404).json({ error: 'Profesor no encontrado' });
       
        }

        res.status(200).json({ succes: true, data: 'Profesor eliminado correctamente' });

    } catch (error) {

        res.status(500).json({ error: 'Error en el servidor' });

    }

};

module.exports = {
    getAllProfesores,
    getOnProfesor,
    deleteProfesor,
    updateProfesor,
    createProfesor
};