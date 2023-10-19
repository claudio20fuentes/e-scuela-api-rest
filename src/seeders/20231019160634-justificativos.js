'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Justificativos", [
      {
        archivo: "exemplo_directorio",
        idApoderado: 1,
        idDetalleAsistencia: 1,
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
