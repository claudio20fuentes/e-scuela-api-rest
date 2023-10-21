"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Cursos", [
      {
        nombreCurso: "1 Básico",
        idProfesor: 1,
        idEscuela: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombreCurso: "2 Básico",
        idProfesor: 2,
        idEscuela: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombreCurso: "3 Básico",
        idProfesor: 3,
        idEscuela: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombreCurso: "4 Básico",
        idProfesor: 4,
        idEscuela: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombreCurso: "5 Básico",
        idProfesor: 5,
        idEscuela: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombreCurso: "6 Básico",
        idProfesor: 6,
        idEscuela: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombreCurso: "7 Básico",
        idProfesor: 7,
        idEscuela: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombreCurso: "8 Básico",
        idProfesor: 8,
        idEscuela: 1,
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
