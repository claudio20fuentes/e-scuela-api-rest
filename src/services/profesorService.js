const Users = require("../models/userModel");
const Profesor = require("../models/profesorModel");
const Curso = require("../models/cursoModel");
const Asignatura = require("../models/asignaturaModel");
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
          },
        ],
        order: [
          [Users, "nombre", "ASC"], // 'ASC' for ascending order, 'DESC' for descending order
        ],
      });

      const result = data.map((profesor) => {
        const { User, Asignaturas, Cursos, id } = profesor;
        return {
          id,
          userData: User,
          subjects: Asignaturas,
          headTeacher: Cursos,
        };
      });
      return result;
    } catch (error) {
      console.error("Error al obtener los profesores: ", error);
    }
  }

  async getOnProfesor(idEscuela = false, id) {
    try {
      const data = await Profesor.findByPk( id,
        {
          include: [
            {
              model: Users,
              attributes: { exclude: ["contrasena"] },
              where: idEscuela ? { idEscuela } : {},
            },
            {
              model: Curso,
              attributes: ["id","nombreCurso"],
            },
            {
              model: Asignatura,
              attributes: ["id","nombre"],
            },
          ],
        }
      );
        const { User, Asignaturas, Cursos } = data;
        return {
          userData: User,
          subjects: Asignaturas,
          headTeacher: Cursos,
        };
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
