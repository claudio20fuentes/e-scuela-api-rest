const Estudiante = require("../models/estudianteModel");
const Matricula = require("../models/matriculaModel");

class MatriculaService {
  async getAllMatriculas(req) {
    try {
      const totalMatriculas = await Matricula.findAll({
        where: { idCurso: req },
        include: [
          {
            model: Estudiante,
          },
        ],
      });
      return totalMatriculas;
    } catch (error) {
      console.error("Error al obtener matrículas: ", error);
      throw error;
    }
  }
}
module.exports = new MatriculaService();
