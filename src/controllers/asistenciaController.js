const asistenciaService = require('../services/asistenciaService');

const createAsistencia = async (req,res) => {

    const dataAsistencia = req.body;

    try {

        const asistencia = await asistenciaService.createAsistencia(dataAsistencia);
        res.status(201).json({succes: true, data: asistencia})

    } catch (error) {

        console.error('Error al crear la asistencia:', error);
        res.status(500).json({ error: 'Error en el servidor' });   
    
    }

};

module.exports = {

    createAsistencia

}