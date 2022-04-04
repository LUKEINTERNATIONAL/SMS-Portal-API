'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     */
     await queryInterface.createTable('Users', 
     { id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        email: {
          type: Sequelize.STRING,
          unique: true
        }
      });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * 
     */
     await queryInterface.dropTable('users');
  }
};
//npx sequelize migration:generate --name Users