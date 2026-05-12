'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Materiais', {
      idMaterial: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome_material: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      codigo_produto: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      valor_unitario_cotado: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      valor_unitario_adquirido: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      unidade_medida: {
        type: Sequelize.STRING(45),
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
    await queryInterface.dropTable('Materiais');
  },
};