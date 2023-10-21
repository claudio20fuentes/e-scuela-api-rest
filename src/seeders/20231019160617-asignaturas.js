'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Asignaturas", [
      {
        nombre: "Lenguaje",
        idEscuela: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Inglés",
        idEscuela: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Matemática",
        idEscuela: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Ciencias",
        idEscuela: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Artes",
        idEscuela: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Historia",
        idEscuela: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Educación Física",
        idEscuela: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Tecnología",
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
