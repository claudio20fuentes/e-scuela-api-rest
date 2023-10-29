"use strict";

const cursos = [1, 2, 3, 4, 5, 6, 7, 8];
const dias = [1, 2, 3, 4, 5];
const bloqueHora = [1, 2, 3, 4, 5, 6];

const profeAsignatura = [
  { profe: 1, asignatura: 1 },
  { profe: 2, asignatura: 2 },
  { profe: 3, asignatura: 3 },
  { profe: 4, asignatura: 4 },
  { profe: 5, asignatura: 5 },
  { profe: 6, asignatura: 6 },
  { profe: 7, asignatura: 7 },
  { profe: 8, asignatura: 8 },
  { profe: 9, asignatura: 8 },
  { profe: 10, asignatura: 2 },
  { profe: 11, asignatura: 1 },
  { profe: 12, asignatura: 5 },
];

// Create a data structure to track teacher assignments by day and block
const assignedTeachers = {};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Bloques",
      dias.flatMap((dia) => {
        return cursos.flatMap((curso) => {
          let availableTeachers = [...profeAsignatura];
          return bloqueHora.map((horario, index) => {
            const availableTeachersForDayBlock = availableTeachers.filter(
              (teacher) => {
                const key = `${dia}_${horario}`;
                if (!assignedTeachers[key]) {
                  assignedTeachers[key] = [];
                }
                return !assignedTeachers[key].includes(teacher.profe);
              }
            );

            if (availableTeachersForDayBlock.length === 0) {
              // All teachers already assigned, select randomly
              const randomIndex = Math.floor(
                Math.random() * availableTeachers.length
              );
              const selectedTeacher = availableTeachers[randomIndex];
              availableTeachers.splice(randomIndex, 1);
              return {
                idDia: dia,
                idAsignatura: selectedTeacher.asignatura,
                idCurso: curso,
                idEscuela: 1,
                idProfesor: selectedTeacher.profe,
                idBloqueHora: horario,
                createdAt: new Date(),
                updatedAt: new Date(),
              };
            } else {
              // Select from available teachers for this day and block
              const randomIndex = Math.floor(
                Math.random() * availableTeachersForDayBlock.length
              );
              const selectedTeacher = availableTeachersForDayBlock[randomIndex];
              availableTeachers = availableTeachers.filter(
                (teacher) => teacher.profe !== selectedTeacher.profe
              );
              const key = `${dia}_${horario}`;
              assignedTeachers[key].push(selectedTeacher.profe);
              return {
                idDia: dia,
                idAsignatura: selectedTeacher.asignatura,
                idCurso: curso,
                idEscuela: 1,
                idProfesor: selectedTeacher.profe,
                idBloqueHora: horario,
                createdAt: new Date(),
                updatedAt: new Date(),
              };
            }
          });
        });
      })
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
