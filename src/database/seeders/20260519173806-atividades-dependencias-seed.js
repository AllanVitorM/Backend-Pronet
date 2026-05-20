'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('AtividadesDependencias', [
      {
        idAtividade: 1,
        idAtividadeDependencia: 2,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idAtividade: 2,
        idAtividadeDependencia: 3,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('AtividadesDependencias', null, {});
  }
};