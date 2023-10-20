'use strict';

/** @type {import('sequelize-cli').Migration} */
let response = new Array(100).fill(0);
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Asistencias", 
    
    response.map((asistencia, index) => {
      return {
        idBloque: index + 1 ,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }))
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
