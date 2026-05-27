'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PerfisPlanejado', {
      idAtividade: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      idPerfilColaborador: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      hh_planejada: {
        type: Sequelize.DECIMAL(8, 2),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PerfisPlanejado');
  },
};