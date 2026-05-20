'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Atividade', [
      {
        idProjeto: 1,            // ajuste conforme IDs existentes no banco
        nome: 'Análise de requisitos',
        descricao: 'Levantamento inicial',
        status: 'Em andamento',
        data_inicio: new Date('2026-06-01'),
        data_fim: new Date('2026-06-15'),
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idProjeto: 1,
        nome: 'Desenvolvimento',
        descricao: 'Implementação do módulo',
        status: 'Planejada',
        data_inicio: new Date('2026-06-16'),
        data_fim: new Date('2026-07-01'),
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Atividade', null, {});
  }
};