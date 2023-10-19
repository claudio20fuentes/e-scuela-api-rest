"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Cursos", [
      {
        nombreCurso: "1 Básico",
        idProfesor: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombreCurso: "2 Básico",
        idProfesor: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombreCurso: "3 Básico",
        idProfesor: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombreCurso: "4 Básico",
        idProfesor: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombreCurso: "5 Básico",
        idProfesor: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombreCurso: "6 Básico",
        idProfesor: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombreCurso: "7 Básico",
        idProfesor: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombreCurso: "8 Básico",
        idProfesor: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
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
