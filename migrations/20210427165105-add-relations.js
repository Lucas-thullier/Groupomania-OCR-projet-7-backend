'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface
      .addConstraint('messages', {
        type: 'FOREIGN KEY',
        fields: ['userId'],
        references: {
          table: 'users',
          field: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      })
      .then(() => {
        queryInterface.addConstraint('messages', {
          type: 'FOREIGN KEY',
          fields: ['conversationId'],
          references: {
            table: 'conversations',
            field: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        })
      })
      .then(() => {
        queryInterface.addConstraint('feedposts', {
          type: 'FOREIGN KEY',
          fields: ['user_id'],
          references: {
            table: 'users',
            field: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        })
      })
      .then(() => {
        queryInterface.addConstraint('feedpostcomments', {
          type: 'FOREIGN KEY',
          fields: ['userId'],
          references: {
            table: 'users',
            field: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        })
      })
      .then(() => {
        queryInterface.addConstraint('feedpostcomments', {
          type: 'FOREIGN KEY',
          fields: ['feedpostId'],
          references: {
            table: 'feedposts',
            field: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        })
      })
      .then(() => {
        queryInterface.addConstraint('users_conversations', {
          type: 'FOREIGN KEY',
          fields: ['userId'],
          references: {
            table: 'users',
            field: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        })
      })
      .then(() => {
        queryInterface.addConstraint('users_conversations', {
          type: 'FOREIGN KEY',
          fields: ['conversationId'],
          references: {
            table: 'conversations',
            field: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        })
      })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
}
