'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        nombre: 'John',
        apellidos: 'Doe',
        contrasena: 'password123',
        correo: 'john@example.com',
        movil: '123-456-7890',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Jane',
        apellidos: 'Smith',
        contrasena: 'securepass',
        correo: 'jane@example.com',
        movil: '987-654-3210',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more users as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
