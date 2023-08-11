'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker');

const TABLE_NAME = 'note';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const notes = [];

    for (let i = 0; i < 7; i++) {
      const note = {
        name: faker.word.words({ count: { min: 3, max: 7 } }),
        content: faker.word.words({ count: { min: 5, max: 15 } }),
        categoryId: faker.number.int({ min: 1, max: 3 }),
        creationDate: new Date(),
        isArchived: faker.datatype.boolean(),
      };

      notes.push(note);
    }

    await queryInterface.bulkInsert(TABLE_NAME, notes);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};
