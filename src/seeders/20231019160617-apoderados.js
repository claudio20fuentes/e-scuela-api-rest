"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Apoderados", [
      {
        idUsuario: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idUsuario: 16,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idUsuario: 17,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idUsuario: 18,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idUsuario: 19,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idUsuario: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idUsuario: 21,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idUsuario: 22,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idUsuario: 23,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idUsuario: 24,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idUsuario: 25,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idUsuario: 26,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idUsuario: 27,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idUsuario: 28,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idUsuario: 29,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idUsuario: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idUsuario: 31,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idUsuario: 32,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idUsuario: 33,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idUsuario: 34,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idUsuario: 35,
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
