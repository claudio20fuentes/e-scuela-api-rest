'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        nombre: 'Eric',
        apellidos: 'Lara',
        contrasena: await bcrypt.hash('123456', 10),
        correo: 'ericlaravega@gmail.com',
        movil: '123-456-7890',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Claudio',
        apellidos: 'Fuentes',
        contrasena: await bcrypt.hash('123456', 10),
        correo: 'claudio20fuentes@gmail.com',
        movil: '123-456-7890',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'John',
        apellidos: 'Doe',
        contrasena: await bcrypt.hash('securepass', 10),
        correo: 'john@example.com',
        movil: '123-456-7890',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Jane',
        apellidos: 'Smith',
        contrasena: await bcrypt.hash('securepass', 10),
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
