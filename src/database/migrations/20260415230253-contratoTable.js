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
    await queryInterface.createTable('Contrato', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      cliente: {
        type: Sequelize.STRING,
        allowNull: false
      },
      descricaoContrato: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tipoContrato: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dataInicio: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      dataFinal: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      valorTotal: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
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
    await queryInterface.dropTable('Contrato')
  }
};
