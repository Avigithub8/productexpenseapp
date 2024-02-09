'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
     await queryInterface.createTable('forgotpass', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    uuid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isActive: {
        type: Sequelize.STRING,
        allowNull: false
    }
      });
     
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.dropTable('forgotpass');
     
  }
};
