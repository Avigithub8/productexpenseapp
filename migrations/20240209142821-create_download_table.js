'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.createTable('download', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false
    }
    });
     
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.dropTable('download');
     
  }
};
