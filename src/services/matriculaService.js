const Matricula = require('../models/matriculaModel');

class MatriculaService {

async getAllMatriculas(req) {
    try {
      const totalMatriculas = await Matricula.count({ where: { idCurso: req } });
      return totalMatriculas;
    } catch (error) {
      console.error('Error al obtener el total de matrículas: ', error);
      throw error;
    }
  }
  
}
module.exports = new MatriculaService();
