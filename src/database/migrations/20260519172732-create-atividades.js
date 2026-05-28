'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Atividades', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      idProjeto: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      idMarco: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data_inicio_planejada: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      data_fim_planejada: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      progresso: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 100,
        },
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data_inicio_real: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      data_fim_real: {
        type: Sequelize.DATE,
        allowNull: true,
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Atividade');
  }
};
