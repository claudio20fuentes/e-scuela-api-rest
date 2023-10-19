'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [
      {
        nombre: 'admin',        
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'profesor_guia',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'profesor_asignatura',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'apoderado',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more role data as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Add the logic to remove the seeded data if needed
    // For simplicity, you can just return queryInterface.bulkDelete('Roles', null, {});
  },
};
