'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("DetallesAsistencias", [
      {
        estado: 0,
        fecha: new Date(),
        idMatricula: 1,
        idEscuela: 1,
        idAsistencia: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        estado: 0,
        fecha: new Date(),
        idMatricula: 1,
        idEscuela: 1,
        idAsistencia: 2,
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
