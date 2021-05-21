"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "friends",
      [
        {
          userA: 1,
          userB: 2,
          isPending: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userA: 1,
          userB: 3,
          isPending: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userA: 2,
          userB: 1,
          isPending: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userA: 3,
          userB: 1,
          isPending: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("friends", null, {});
  },
};
