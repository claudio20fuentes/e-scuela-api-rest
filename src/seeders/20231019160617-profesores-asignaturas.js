'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("ProfesoresAsignaturas", [
      {
        idProfesor: 1,
        idAsignatura: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idProfesor: 2,
        idAsignatura: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idProfesor: 3,
        idAsignatura: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idProfesor: 4,
        idAsignatura: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idProfesor: 5,
        idAsignatura: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idProfesor: 6,
        idAsignatura: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idProfesor: 7,
        idAsignatura: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idProfesor: 8,
        idAsignatura: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idProfesor: 9,
        idAsignatura: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idProfesor: 10,
        idAsignatura: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idProfesor: 11,
        idAsignatura: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idProfesor: 12,
        idAsignatura: 5,
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
