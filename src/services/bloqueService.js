const Bloque = require('../models/bloqueModel');
const Asignatura = require('../models/asignaturaModel');

class BloqueService {

    //Trae todos los bloques del dia de cada curso
    async getAllBloquesDiaCurso(idDia, idCurso) {
        try {
            const result = await Bloque.findAll({
                where: {
                    idDia: idDia,
                    idCurso: idCurso
                },
                include: {
                    model: Asignatura,
                    attributes: ['id', 'nombre']
                }
            });

            return result;
        } catch (error) {

            console.error("Error al traer los bloques", error);

        }
    };

    async createBloque(bloqueData) {
        try {
            const bloque = await Bloque.create(bloqueData);
            return bloque;

        } catch (error) {

            console.error("Error al crear el bloque", error);

        }
    };

    async updateBloque(id, data){
        try {
            const bloque = await Bloque.findByPk(id);
            if (!bloque) {
                console.error('Bloque no encontrado');
            }
            await bloque.update(data);
            return bloque;
        } catch (error) {
            console.error(`Error al editar el bloque con ID ${id}:`, error);
        }
    };

    //Elimina bloque por id
    async deleteBloque(id) {
        try {
            const bloque = await Bloque.findByPk(id);
            if (!bloque) {
                console.error('Bloque no encontrado');
            }
            await bloque.destroy();
            return bloque;
        } catch (error) {
            console.error(`Error al eliminar el bloque con ID ${id}:`, error);
        }
    };


    //Elimina todos los bloques de un dia asociados a un curso 
    async deleteAllBloquesDiaCurso(idDia, idCurso){
        try {
            const result = await Bloque.destroy({
                where: {
                    idDia: idDia,
                    idCurso: idCurso
                }
            });
            return result;
        } catch (error) {
            console.error("Error al eliminar los bloques", error);
            throw error;
        }
    };

};

module.exports = new BloqueService();