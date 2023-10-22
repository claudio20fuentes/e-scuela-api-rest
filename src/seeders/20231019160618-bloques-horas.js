"use strict";

const horarios = [
  {
    inicio: '08:00:00',
    fin: '08:45:00',
  },
  {
    inicio: '08:45:00',
    fin: '09:30:00',
  },
  {
    inicio: '09:45:00',
    fin: '10:30:00',
  },
  {
    inicio: '10:30:00',
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
      "BloquesHoras",
      horarios.map((horario, index) => {
        return {
          horaInicio: horarios[index].inicio,
          horaFin: horarios[index].fin,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
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
