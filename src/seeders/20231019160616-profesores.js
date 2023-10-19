'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Profesores', [
      {
        idUsuario: 3,        
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idUsuario: 4,        
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idUsuario: 6,        
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idUsuario: 7,        
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idUsuario: 8,        
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idUsuario: 9,        
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idUsuario: 10,        
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idUsuario: 11,        
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idUsuario: 12,        
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idUsuario: 13,        
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idUsuario: 14,        
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idUsuario: 15,        
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
