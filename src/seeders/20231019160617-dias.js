'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Dias", [
      {
        nombre: "Lunes",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Martes",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Miércoles",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Jueves",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Viernes",
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
