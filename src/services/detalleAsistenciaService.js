const Asistencia = require("../models/asistenciaModel");
const DetalleAsistencia = require("../models/detalleAsistenciaModel");
const Estudiante = require("../models/estudianteModel");
const Matricula = require("../models/matriculaModel");

class DetalleAsistenciaService {
  async getDetalleAsistencia(query) {
    try {
      const detalle = await Asistencia.findAll({
        where: query,
        attributes: ["fecha", "idBloque"],
        include: [
          {
            model: DetalleAsistencia,
            attributes: ["estado"],
            include: {
              model: Matricula,
              attributes: ["idCurso", "idEstudiante"],
              include: {
                model: Estudiante,
                attributes: ["id", "nombre", "apellido"],
              },
            },
          },
        ],
      });
      return detalle;
    } catch (error) {
      console.error(error);
    }
  }

  async createDetalleAsistencia(detalleAsistencia) {
    try {
      const detalle = await DetalleAsistencia.create(detalleAsistencia);
      return detalle;
    } catch (error) {
      console.error("Error al crear el detalle de asistencia");
    }
  }

  async updateDetalleAsistencia({id, estado}) {
    try {
      const detalle = await DetalleAsistencia.update({estado}, {
        where: { id },
      });
      return detalle;
    } catch (error) {
      console.error("Error al actualizar el detalle de asistencia");
    }
  }
}

module.exports = new DetalleAsistenciaService();
