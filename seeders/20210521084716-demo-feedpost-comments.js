'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'feedpostcomments',
      [
        {
          userId: 3,
          feedpostId: 1,
          textContent: "c'est bien vrai ça !",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          feedpostId: 1,
          textContent: 'Vivement ce weekend quand meme!',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('feedpostscomments', null, {})
  },
}
