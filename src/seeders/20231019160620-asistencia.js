'use strict';

const dates = [
  "2023-10-02T10:00:00",
  "2023-10-03T10:00:00",
  "2023-10-04T10:00:00",
  "2023-10-05T10:00:00",
  "2023-10-06T10:00:00",
  "2023-10-09T10:00:00",
  "2023-10-10T10:00:00",
  "2023-10-11T10:00:00",
  "2023-10-12T10:00:00",
  "2023-10-13T10:00:00",
  "2023-10-16T10:00:00",
  "2023-10-17T10:00:00",
  "2023-10-18T10:00:00",
  "2023-10-19T10:00:00",
  "2023-10-20T10:00:00",
  "2023-10-23T10:00:00",
  "2023-10-24T10:00:00",
  "2023-10-25T10:00:00",
  "2023-10-26T10:00:00",
  "2023-10-27T10:00:00"
];

const randomIndex = () => Math.floor(Math.random() * dates.length);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Asistencia", [
      {
        fecha: new Date(dates[randomIndex()]),
        idBloque: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fecha: new Date(dates[randomIndex()]),
        idBloque: 1,
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
