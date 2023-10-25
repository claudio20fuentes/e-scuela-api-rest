const Bloque = require("../models/bloqueModel");
const Asignatura = require("../models/asignaturaModel");
const Dia = require("../models/diaModel");
const Curso = require("../models/cursoModel");
const Profesor = require("../models/profesorModel");
const Usuario = require("../models/userModel");
const BloqueHora = require("../models/bloqueHoraModel");
const Asistencia = require("../models/asistenciaModel");
const DetalleAsistencia = require("../models/detalleAsistenciaModel");
const Estudiante = require("../models/estudianteModel");
const Matricula = require("../models/matriculaModel");

const BloqueHoraService = require("./bloqueHoraService");

const { Op } = require("sequelize");

class BloquesServices {
  async getAllBloques({
    idEscuela,
    idDia,
    idCurso,
    idAsignatura,
    idProfesor,
    hora,
  }) {
    try {
      const whereClause = { idEscuela };

      if (idDia) {
        whereClause.idDia = Number(idDia);
      }

      if (idCurso) {
        whereClause.idCurso = Number(idCurso);
      }

      if (idAsignatura) {
        whereClause.idAsignatura = Number(idAsignatura);
      }

      if (idProfesor) {
        whereClause.idProfesor = Number(idProfesor);
      }

      if (hora) {
        const bloquesHora = await BloqueHoraService.getBloqueHora({ hora });
        const bloquesHoraId = bloquesHora.map((bloqueHora) => bloqueHora.id);
        if (bloquesHoraId.length === 0) {
          return [];
        }
        const maxBloqueHoraId = Math.max(...bloquesHoraId);
        whereClause.idBloqueHora = {
          [Op.lte]: maxBloqueHoraId,
        };
      }

      const result = await Bloque.findAll({
        where: whereClause,

        include: [
          {
            model: Asignatura,
            attributes: ["id", "nombre"],
          },
          {
            model: Dia,
            attributes: ["id", "nombre"],
          },
          {
            model: Curso,
            attributes: ["id", "nombreCurso"],
          },
          {
            model: BloqueHora,
            attributes: ["id", "horaInicio", "horaFin"],
          },
          {
            model: Profesor,
            attributes: ["id"],
            include: {
              model: Usuario,
              attributes: ["id", "nombre", "apellidos"],
            },
          },
          {
            model: Asistencia,
            attributes: ["id", "fecha"],
            include: {
              model: DetalleAsistencia,
              attributes: ["id", "estado",],
              include: {
                model: Matricula,
                Include: {
                  model: Estudiante,
                }
              }
            }
          },
        ],
      });

      return result;
    } catch (error) {
      console.error("Error al traer los bloques", error);
    }
  }

  //Trae todos los bloques del dia de cada curso
  async getAllBloquesDiaCurso(idDia, idCurso) {
    try {
      const result = await Bloque.findAll({
        where: {
          idDia: idDia,
          idCurso: idCurso,
        },
        include: [
          {
            model: Asignatura,
            attributes: ["id", "nombre"],
          },
          {
            model: DetalleAsistencia,
          },
        ],
      });

      return result;
    } catch (error) {
      console.error("Error al traer los bloques", error);
    }
  }

  async createBloque(bloqueData) {
    try {
      const bloque = await Bloque.create(bloqueData);
      return bloque;
    } catch (error) {
      console.error("Error al crear el bloque", error);
    }
  }

  async updateBloque(id, data) {
    try {
      const bloque = await Bloque.findByPk(id);
      if (!bloque) {
        console.error("Bloque no encontrado");
      }
      await bloque.update(data);
      return bloque;
    } catch (error) {
      console.error(`Error al editar el bloque con ID ${id}:`, error);
    }
  }

  //Elimina bloque por id
  async deleteBloque(id) {
    try {
      const bloque = await Bloque.findByPk(id);
      if (!bloque) {
        console.error("Bloque no encontrado");
      }
      await bloque.destroy();
      return bloque;
    } catch (error) {
      console.error(`Error al eliminar el bloque con ID ${id}:`, error);
    }
  }

  //Elimina todos los bloques de un dia asociados a un curso
  async deleteAllBloquesDiaCurso(idDia, idCurso) {
    try {
      const result = await Bloque.destroy({
        where: {
          idDia: idDia,
          idCurso: idCurso,
        },
      });
      return result;
    } catch (error) {
      console.error("Error al eliminar los bloques", error);
      throw error;
    }
  }
}

module.exports = new BloquesServices();
