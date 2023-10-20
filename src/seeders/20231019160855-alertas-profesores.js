'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("AlertasProfesores", [
      {
        tipo: 1,
        fecha: new Date(),
        descripcion: "Alerta de prueba",
        estado: 1,
        idDetalleAsistencia: 1,
        idProfesor: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tipo: 2,
        fecha: new Date(),
        descripcion: "Alerta de prueba",
        estado: 1,
        idDetalleAsistencia: 1,
        idProfesor: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tipo: 3,
        fecha: new Date(),
        descripcion: "Alerta de prueba",
        estado: 1,
        idDetalleAsistencia: 1,
        idProfesor: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tipo: 3,
        fecha: new Date(),
        descripcion: "Alerta de prueba",
        estado: 1,
        idDetalleAsistencia: 1,
        idProfesor: 1,
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
