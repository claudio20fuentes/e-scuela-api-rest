const Estudiante = require("../models/estudianteModel");
const Matricula = require("../models/matriculaModel");
const Curso = require("../models/cursoModel");

class MatriculaService {
  async getAllMatriculasByCurso(req) {
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

  async getAllMatriculas(req) {
    try {
      where: {
        idEscuela: req.user.school;
      }
      const data = await Matricula.findAll({
        attributes: ["fechaMatricula", "id"],
        include: [
          {
            model: Estudiante,
            attributes: ["nombre", "apellido", "rut"],
          },
          {
            model: Curso,
            attributes: ["id", "nombreCurso"],
          },
        ],
        where: { idEscuela: req.user.school },
      });

      const result = data.map((matricula) => {
        return {
          estudiantes: matricula.Estudiante,
          matricula: { id: matricula.id, fecha: matricula.fechaMatricula },
          curso: { id: matricula.Curso.id, nombre: matricula.Curso.nombreCurso}
        };
      });

      return result;
    } catch (error) {
      console.error("Error al traer las matriculas", error);
    }
  }
}
module.exports = new MatriculaService();
