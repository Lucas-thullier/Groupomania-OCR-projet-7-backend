'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface
      .addConstraint('Messages', {
        type: 'FOREIGN KEY',
        fields: ['userId'],
        references: {
          table: 'Users',
          field: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      })
      .then(() => {
        queryInterface.addConstraint('Messages', {
          type: 'FOREIGN KEY',
          fields: ['conversationId'],
          references: {
            table: 'Conversations',
            field: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        })
      })
      .then(() => {
        queryInterface.addConstraint('FeedPosts', {
          type: 'FOREIGN KEY',
          fields: ['user_id'],
          references: {
            table: 'Users',
            field: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        })
      })
      .then(() => {
        queryInterface.addConstraint('FeedPostComments', {
          type: 'FOREIGN KEY',
          fields: ['userId'],
          references: {
            table: 'Users',
            field: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        })
      })
      .then(() => {
        queryInterface.addConstraint('FeedPostComments', {
          type: 'FOREIGN KEY',
          fields: ['feedpostId'],
          references: {
            table: 'FeedPosts',
            field: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        })
      })
      .then(() => {
        queryInterface.addConstraint('Users_Conversations', {
          type: 'FOREIGN KEY',
          fields: ['userId'],
          references: {
            table: 'Users',
            field: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        })
      })
      .then(() => {
        queryInterface.addConstraint('Users_Conversations', {
          type: 'FOREIGN KEY',
          fields: ['conversationId'],
          references: {
            table: 'Conversations',
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
