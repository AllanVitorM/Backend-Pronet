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
    await queryInterface.createTable("HistoricosBaseCustoPerfil", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      idPerfilColaborador: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      date_inicio_vigencia: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      data_fim_vigencia: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      base_salarial: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      base_beneficios: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      fm_adicional_noturno: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
      },
      fm_adicional_periculosidade: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
      },
      fm_adicional_insalubridade: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
      },
      CH_mensal: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
      },
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('HistoricosBaseCustoPerfil')
  }
};
