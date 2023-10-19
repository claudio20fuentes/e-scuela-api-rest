'use strict';

const cursos = [1,2,3,4,5,6,7,8]
const asignaturas = [1,2,3,4,5,6,7,8]
const dias = [1,2,3,4,5]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Bloques", 
    
    cursos.flatMap((curso) => {
      return dias.map((dia) => {
        return {
          horaInicio: new Date().setHours(8, 0, 0, 0),
          horaFin: new Date().setHours(9, 30, 0, 0),
          idDia: idDia,
          idAsignatura: 1, // You may need to adjust this ID
          idCurso: curso.id, // Assuming curso has an id property
          createdAt: new Date(),
          updatedAt: new Date(),
          weekday: weekdays[idDia - 1], // Get the weekday name from the array
        };
      });
    })

  )
    
    [
      // Curso 1
      {
        horaInicio: new Date().setHours(8, 0, 0, 0),
        horaFin: new Date().setHours(9, 30, 0, 0),
        idDia: 1,
        idAsignatura: 1,
        idCurso: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
      // CURSO 2
      {
        horaInicio: new Date().setHours(8, 0, 0, 0),
        horaFin: new Date().setHours(9, 30, 0, 0),
        idDia: 1,
        idAsignatura: 1,
        idCurso: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        horaInicio: new Date().setHours(10, 0, 0, 0),
        horaFin: new Date().setHours(11, 15, 0, 0),
        idDia: 1,
        idAsignatura: 2,
        idCurso: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        horaInicio: new Date().setHours(11,30, 0, 0),
        horaFin: new Date().setHours(12, 15, 0, 0),
        idDia: 1,
        idAsignatura: 1,
        idCurso: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        horaInicio: new Date().setHours(12, 15, 0, 0),
        horaFin: new Date().setHours(13, 0, 0, 0),
        idDia: 1,
        idAsignatura: 1,
        idCurso: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Curso 3
      {
        horaInicio: new Date().setHours(8, 0, 0, 0),
        horaFin: new Date().setHours(9, 30, 0, 0),
        idDia: 1,
        idAsignatura: 1,
        idCurso: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        horaInicio: new Date().setHours(10, 0, 0, 0),
        horaFin: new Date().setHours(11, 15, 0, 0),
        idDia: 1,
        idAsignatura: 2,
        idCurso: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        horaInicio: new Date().setHours(11,30, 0, 0),
        horaFin: new Date().setHours(12, 15, 0, 0),
        idDia: 1,
        idAsignatura: 1,
        idCurso: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        horaInicio: new Date().setHours(12, 15, 0, 0),
        horaFin: new Date().setHours(13, 0, 0, 0),
        idDia: 1,
        idAsignatura: 1,
        idCurso: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Curso 4
      {
        horaInicio: new Date().setHours(8, 0, 0, 0),
        horaFin: new Date().setHours(9, 30, 0, 0),
        idDia: 1,
        idAsignatura: 1,
        idCurso: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        horaInicio: new Date().setHours(10, 0, 0, 0),
        horaFin: new Date().setHours(11, 15, 0, 0),
        idDia: 1,
        idAsignatura: 2,
        idCurso: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        horaInicio: new Date().setHours(11,30, 0, 0),
        horaFin: new Date().setHours(12, 15, 0, 0),
        idDia: 1,
        idAsignatura: 1,
        idCurso: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        horaInicio: new Date().setHours(12, 15, 0, 0),
        horaFin: new Date().setHours(13, 0, 0, 0),
        idDia: 1,
        idAsignatura: 1,
        idCurso: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Curso 5
      {
        horaInicio: new Date().setHours(8, 0, 0, 0),
        horaFin: new Date().setHours(9, 30, 0, 0),
        idDia: 1,
        idAsignatura: 1,
        idCurso: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        horaInicio: new Date().setHours(10, 0, 0, 0),
        horaFin: new Date().setHours(11, 15, 0, 0),
        idDia: 1,
        idAsignatura: 2,
        idCurso: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        horaInicio: new Date().setHours(11,30, 0, 0),
        horaFin: new Date().setHours(12, 15, 0, 0),
        idDia: 1,
        idAsignatura: 1,
        idCurso: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        horaInicio: new Date().setHours(12, 15, 0, 0),
        horaFin: new Date().setHours(13, 0, 0, 0),
        idDia: 1,
        idAsignatura: 1,
        idCurso: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Curso 6
      {
        horaInicio: new Date().setHours(8, 0, 0, 0),
        horaFin: new Date().setHours(9, 30, 0, 0),
        idDia: 1,
        idAsignatura: 1,
        idCurso: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        horaInicio: new Date().setHours(10, 0, 0, 0),
        horaFin: new Date().setHours(11, 15, 0, 0),
        idDia: 1,
        idAsignatura: 2,
        idCurso: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        horaInicio: new Date().setHours(11,30, 0, 0),
        horaFin: new Date().setHours(12, 15, 0, 0),
        idDia: 1,
        idAsignatura: 1,
        idCurso: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        horaInicio: new Date().setHours(12, 15, 0, 0),
        horaFin: new Date().setHours(13, 0, 0, 0),
        idDia: 1,
        idAsignatura: 1,
        idCurso: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Curso 7
      {
        horaInicio: new Date().setHours(8, 0, 0, 0),
        horaFin: new Date().setHours(9, 30, 0, 0),
        idDia: 1,
        idAsignatura: 1,
        idCurso: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        horaInicio: new Date().setHours(10, 0, 0, 0),
        horaFin: new Date().setHours(11, 15, 0, 0),
        idDia: 1,
        idAsignatura: 2,
        idCurso: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        horaInicio: new Date().setHours(11,30, 0, 0),
        horaFin: new Date().setHours(12, 15, 0, 0),
        idDia: 1,
        idAsignatura: 1,
        idCurso: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        horaInicio: new Date().setHours(12, 15, 0, 0),
        horaFin: new Date().setHours(13, 0, 0, 0),
        idDia: 1,
        idAsignatura: 1,
        idCurso: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Curso 8
      {
        horaInicio: new Date().setHours(8, 0, 0, 0),
        horaFin: new Date().setHours(9, 30, 0, 0),
        idDia: 1,
        idAsignatura: 1,
        idCurso: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        horaInicio: new Date().setHours(10, 0, 0, 0),
        horaFin: new Date().setHours(11, 15, 0, 0),
        idDia: 1,
        idAsignatura: 2,
        idCurso: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        horaInicio: new Date().setHours(11,30, 0, 0),
        horaFin: new Date().setHours(12, 15, 0, 0),
        idDia: 1,
        idAsignatura: 1,
        idCurso: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        horaInicio: new Date().setHours(12, 15, 0, 0),
        horaFin: new Date().setHours(13, 0, 0, 0),
        idDia: 1,
        idAsignatura: 1,
        idCurso: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
