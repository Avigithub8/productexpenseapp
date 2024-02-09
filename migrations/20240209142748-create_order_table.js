'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.createTable('order', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    paymentId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    orderId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    }
      });
     
  },

  async down (queryInterface, Sequelize) {
   
      await queryInterface.dropTable('order');
     
  }
};
