const Asignatura = require("../models/asignaturaModel");
const Curso = require("../models/cursoModel");
const Profesor = require("../models/profesorModel");
const Users = require("../models/userModel");
class ProfesorService {
  async getAllProfesores(req) {
    try {
      const data = await Profesor.findAll({
        include: [
          {
            model: Users,
            attributes: { exclude: ["contrasena"] },
            where: { idEscuela: req.user.school },
          },
          {
            model: Curso,
            attributes: ["nombreCurso"],
          },
          {
            model: Asignatura,
            attributes: ["nombre"],
          }
        ],
      });

      const result = data.map((profesor) => {
        const { User, Asignaturas, Cursos } = profesor;
        return {
          userData: User, 
          subjects: Asignaturas,
          headTeacher: Cursos
        };
      });
      return result;
    } catch (error) {
      console.error("Error al obtener los profesores: ", error);
    }
  }

  async getOnProfesor(id) {
    try {
      const profesor = await Profesor.findByPk(id);
      return profesor;
    } catch (error) {
      console.error(`Error al obtener el profesor con ID ${id}:`, error);
    }
  }

  async createProfesor(profesorData) {
    try {
      const profesor = await Profesor.create(profesorData);
      return profesor;
    } catch (error) {
      console.error("Error al crear el profesor", error);
    }
  }

  async updateProfesor(id, data) {
    try {
      const profesor = await Profesor.findByPk(id);
      if (!profesor) {
        console.error("Profesor no encontrado");
      }
      await profesor.update(data);
      return true;
    } catch (error) {
      console.error(`Error al editar el profesor con ID ${id}:`, error);
    }
  }

  async deleteProfesor(id) {
    try {
      const profesor = await Profesor.findByPk(id);
      if (!profesor) {
        console.error("Profesor no encontrado");
      }
      await profesor.destroy();
      return true;
    } catch (error) {
      console.error(`Error al eliminar el profesor con ID ${id}:`, error);
    }
  }
}

module.exports = new ProfesorService();
