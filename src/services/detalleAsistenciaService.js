const DetalleAsistencia = require('../models/detalleAsistenciaModel');

class DetalleAsistenciaService{

    async createDetalleAsistencia(detalleAsistencia){

        try {

        const detalle = await DetalleAsistencia.create(detalleAsistencia);
        return detalle;

        } catch (error) {

            console.error('Error al crear el detalle de asistencia');
            
        }

    }

}

module.exports = new DetalleAsistenciaService();