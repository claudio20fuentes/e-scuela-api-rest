const Asistencia = require('../models/asistenciaModel');
const Bloque = require('../models/bloqueModel');

class AsistenciaService{

    async createAsistencia(asistenciaData){
        try {
            const asistencia = Asistencia.create(asistenciaData);
            return asistencia;
        } catch (error) {
            console.error("Error al crear la asistencia",error);            
        }
    }

}

module.exports = new AsistenciaService();