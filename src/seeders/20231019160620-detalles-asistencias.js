'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("DetallesAsistencias", [
      {
        presente: 0,
        ausente: 0,
        atraso: 0,
        idAsistencia: 1,
        idMatricula: 1,
        idEscuela: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        presente: 0,
        ausente: 0,
        atraso: 0,
        idAsistencia: 1,
        idMatricula: 1,
        idEscuela: 1,
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
