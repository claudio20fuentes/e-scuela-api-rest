"use strict";

const cursos = [1, 2, 3, 4, 5, 6, 7, 8];
const asignaturas = [1, 2, 3, 4, 5, 6, 7, 8];
const dias = [1, 2, 3, 4, 5];
const horarios = [
  {
    inicio: '08:00:00',
    fin: '09:30:00',
  },
  {
    inicio: '09:45:00',
    fin: '11:15:00',
  },
  {
    inicio: '11:30:00',
    fin: '12:15:00',
  },
  {
    inicio: '12:15:00',
    fin: '13:00:00',
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Bloques",
      cursos.flatMap((curso) => {
        return dias.flatMap((dia) => {
          return horarios.map((horario, index) => {
            const randomIndex = Math.floor(Math.random() * asignaturas.length);
            return {
              horaInicio: horarios[index].inicio,
              horaFin: horarios[index].fin,
              idDia: dia,
              idAsignatura: asignaturas[randomIndex],
              idCurso: curso,
              idEscuela: 1,
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
