const Profesor = require('../models/profesorModel');

class ProfesorService{

    async getAllProfesores(){
        try {
            const result = await Profesor.findAll();
            return result;
        } catch (error) {
            console.error('Error al obtener los profesores:', error);
        }
    };

    async getOnProfesor(id){
        try {
            const profesor = await Profesor.findByPk(id);
            return profesor;
        } catch (error) {
            console.error(`Error al obtener el profesor con ID ${id}:`, error);
        }
    };

    async createProfesor(profesorData){
        try {
            
            const profesor = await Profesor.create(profesorData);
            return profesor

        } catch (error) {

            console.error("Error al crear el profesor", error);
            
        }
    };

    async updateProfesor(id, data){
        try {
            const profesor = await Profesor.findByPk(id);
            if (!profesor) {
                console.error('Profesor no encontrado');
            }
            await profesor.update(data);
            return true;    
        } catch (error) {
            console.error(`Error al editar el profesor con ID ${id}:`, error);
        }
    };

    async deleteProfesor(id){
        try {
            const profesor = await Profesor.findByPk(id);
            if (!profesor) {
                console.error('Profesor no encontrado')
            }
            await profesor.destroy();
            return true;
        } catch (error) {
            console.error(`Error al eliminar el profesor con ID ${id}:`, error);
        }
    };

}

module.exports = new ProfesorService();