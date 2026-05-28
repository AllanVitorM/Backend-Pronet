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
    await queryInterface.createTable('ColaboradoresUtilizados', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      idColaborador: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      idAtividade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      idProjeto: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      idResponsavel: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      idDiarioObra: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      hh_real: {
        type: Sequelize.DECIMAL(8, 2)
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
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
    await queryInterface.dropTable('ColaboradoresUtilizados')
  }
};
