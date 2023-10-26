const Asistencia = require("../models/asistenciaModel");
const DetalleAsistencia = require("../models/detalleAsistenciaModel");
const Estudiante = require("../models/estudianteModel");
const Matricula = require("../models/matriculaModel");
const Bloque = require("../models/bloqueModel");

class AsistenciaService {
  async getAsistencia(query) {
    try {
      const asistencia = await Asistencia.findAll({
        where: query,
        attributes: ["fecha", "idBloque"],
        include: [
          {
            model: DetalleAsistencia,
            attributes: ["idMatricula","estado"],
            include: {
              model: Matricula,
              attributes: ["idCurso", "idEstudiante"],
              include: {
                model: Estudiante,
                attributes: ["id", "nombre", "apellido"],
              },
            },
          },
          {
            model: Bloque,
            attributes: ["idCurso", "idProfesor", "idBloqueHora"],
            include: {
              model: Estudiante,
              attributes: ["id", "nombre", "apellido"],
            },
          }
        ],
      });
      return detalle;
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
