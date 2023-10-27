const Asistencia = require("../models/asistenciaModel");
const DetalleAsistencia = require("../models/detalleAsistenciaModel");
const Estudiante = require("../models/estudianteModel");
const Matricula = require("../models/matriculaModel");
const Bloque = require("../models/bloqueModel");
const Curso = require("../models/cursoModel");

class AsistenciaService {
  async getAsistencia(query) {
    try {
      const asistencia = await Asistencia.findAll({
        where: query,
        attributes: ["id","fecha", "idBloque"],
        include: [
          {
            model: DetalleAsistencia,
            attributes: ["idMatricula", "estado"],
          },
          {
            model: Bloque,
            attributes: ["id", "idBloqueHora"],
            include: {
              model: Curso,
              attributes: ["id", "nombreCurso"],
            },
          },
        ],
      });
      return asistencia;
    } catch (error) {
      console.error(error);
    }
  }

  async createAsistencia(idBloque) {
    try {
      const detalle = await Asistencia.create(idBloque);
      return detalle;
    } catch (error) {
      console.error("Error al crear la asistencia");
    }
  }
}

module.exports = new AsistenciaService();
