const Curso = require('../models/cursoModel');
const Profesor = require("../models/profesorModel");
const Users = require("../models/userModel");
const MatriculaService = require("../services/matriculaService");

class CursoService {
    async getAllCursos(req) {
        try {
            const data = await Curso.findAll({
                include: [
                    {
                        model: Profesor,
                        attributes: {exclude: ["idUsuario", "createdAt", "updatedAt"]},
                        include: [
                            {
                                model: Users,
                                attributes: ["nombre","apellidos","correo","movil","idRol"],
                                where: { idEscuela: req.user.school },
                            },
                        ],
                    },
                ]
            });

            // const totalMatriculas = await MatriculaService.getAllMatriculas(1);

            // const result = data.map((curso)=>{
            //     return {
            //         courseData : { id: curso.id, nombre: curso.nombreCurso},
            //         teacherData : curso.Profesore.User,
            //         totalMatriculas : totalMatriculas
            //     }
            // })

            const result = [];

            for (const curso of data) {
              const totalMatriculas = await MatriculaService.getAllMatriculas(curso.id);
        
              result.push({
                courseData: { id: curso.id, nombre: curso.nombreCurso },
                teacherData: curso.Profesore.User,
                totalMatriculas: totalMatriculas,
              });
            }

            return result;
        } catch (error) {
            console.error("Error al obtener los cursos: ", error);
        }
    }

    async getOnCurso(id) {

        try {
            const curso = await Curso.findByPk(id);
            return curso;
        } catch (error) {
            console.error(`Error al obtener el curso con ID ${id}:`, error);

        }
    };

    async createCurso(cursoData) {
        try {
            const curso = await Curso.create(cursoData);
            return curso;

        } catch (error) {
            console.error("Error al crear el curso", error);

        }
    };

    async updateCurso(id, data) {
        try {
            const curso = await Curso.findByPk(id);
            if (!curso) {
                console.error('Curso no encontrado');
            }
            await curso.update(data)
            return true;
        } catch (error) {
            console.error(`Error al editar el curso con ID ${id}:`, error);

        }
    };

    async deleteCurso(id) {
        try {
            const curso = await Curso.findByPk(id);
            if (!curso) {
                console.error('Curso no encontrado');
            }
            await curso.destroy();
            return true;
        } catch (error) {
            console.error(`Error al eliminar el curso con ID ${id}:`, error);

        }
    };

}

module.exports = new CursoService();