'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'feedposts',
      [
        {
          user_id: 2,
          textContent: 'Quelle belle journée au bureau !',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 3,
          textContent: "On mange quoi aujourd'hui?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          textContent: 'Comment allez-vous mon equipe préférée?',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 3,
          textContent: 'Qui pour un babyfoot?',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 2,
          textContent: 'Demain soirée disco?',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 3,
          textContent: 'BONJOUR',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('feedposts', null, {})
  },
}
