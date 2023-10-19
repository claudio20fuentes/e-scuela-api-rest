const DetalleAsistenciaService = require('../services/detalleAsistenciaService');

const createDetalleAsistencia = async (req, res) => {
    
            const detalle = req.body;

    try {

        const result = await DetalleAsistenciaService.createDetalleAsistencia(detalle);
        return res.status(200).json({succes: true, data: result});

    } catch (error) {

        res.status(500).json({ error: "Error en el servidor" });

    }

}

module.exports = {

    createDetalleAsistencia

}