'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Conditions',
      'active',
      {
        type: Sequelize.INTEGER,
        defaultValue: 1
      }
    )

    await queryInterface.addColumn(
      'Conditions',
      'paired_with_conditions_ids',
      {
        type: Sequelize.STRING,
        defaultValue: ""
      }
    )
  },

  async down (queryInterface, Sequelize) {}
};
