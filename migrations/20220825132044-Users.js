'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */


     await queryInterface.addColumn(
      'Users',
      'active',
      {
        type: Sequelize.INTEGER,
        defaultValue: 1
      }
    )

    await queryInterface.addColumn(
      'Users',
      'delete',
      {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
