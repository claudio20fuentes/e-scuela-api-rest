"use strict";

const cursos = [1, 2, 3, 4, 5, 6, 7, 8];
const asignaturas = [1, 2, 3, 4, 5, 6, 7, 8];
const dias = [1, 2, 3, 4, 5];
const profesores = [1, 2, 3, 4, 5, 6, 7, 8];
const bloqueHora = [1, 2, 3, 4, 5, 6]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Bloques",
      cursos.flatMap((curso) => {
        return dias.flatMap((dia) => {
          return bloqueHora.map((horario, index) => {
            const randomIndex = Math.floor(Math.random() * asignaturas.length);
            return {
              idDia: dia,
              idAsignatura: asignaturas[randomIndex],
              idCurso: curso,
              idEscuela: 1,
              idProfesor: profesores[randomIndex],
              idBloqueHora: horario,
              createdAt: new Date(),
              updatedAt: new Date(),
            };
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
