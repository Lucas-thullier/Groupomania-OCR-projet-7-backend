'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addConstraint('Friends', {
      type: 'FOREIGN KEY',
      fields: ['userA'],
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
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
