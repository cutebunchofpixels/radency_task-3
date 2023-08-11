'use strict';

const TABLE_NAME = 'category';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const categories = [
      { id: 1, value: 'Idea' },
      { id: 2, value: 'Task' },
      { id: 3, value: 'Random thought' },
    ];

    await queryInterface.bulkInsert(TABLE_NAME, categories);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
