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
      'Facilities',
      'vpn_ip_address',
      {
        type: Sequelize.STRING,
        defaultValue: null
      }
    )

    await queryInterface.addColumn(
      'Facilities',
      'last_pinged',
      {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
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
