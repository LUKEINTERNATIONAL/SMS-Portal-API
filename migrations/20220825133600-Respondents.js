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
      'Respondents',
      'password',
      {
        type: Sequelize.STRING,
        defaultValue: '$2a$08$Bq3hA98sPFdNg4BYehU0ouqg.CP7oVLqQzWemXeLkF1Yv/gsqVGwq'
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
