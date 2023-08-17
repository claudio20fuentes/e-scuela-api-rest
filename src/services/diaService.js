const Dia = require('../models/diaModel');

class DiaService {

    async getAllDias() {
        try {
            const result = await Dia.findAll();
            return result;
        } catch (error) {
            console.error('Error al obtener los días:', error);
        }
    };

    async getOnDia(id) {

        try {
            const dia = await Dia.findByPk(id);
            return dia;
        } catch (error) {
            console.error(`Error al obtener el día con ID ${id}:`, error);
        }
    };
}

module.exports = new DiaService();

