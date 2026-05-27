'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('DiarioObra', {

      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      data_registro: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      percentual_atividade: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isDeleted: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('DiarioObra');
  }
};
