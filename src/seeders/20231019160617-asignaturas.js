'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Asignaturas", [
      {
        nombre: "Lenguaje",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Inglés",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Matemática",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Ciencias",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Artes",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Historia",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Educación Física",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Tecnología",
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
