'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'messages',
      [
        {
          userId: 2,
          conversationId: 1,
          textContent: "On mange quoi aujourd'hui?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          conversationId: 1,
          textContent: 'chinois ça te dirait?',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          conversationId: 1,
          textContent: 'parfait !',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          conversationId: 2,
          textContent: 'hello',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('messages', null, {})
  },
}
