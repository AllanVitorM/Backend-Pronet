'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Cliente', [
      {
        nome: 'Empresa ABC Ltda',
        descricao: 'Cliente do setor industrial',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Comércio XYZ S.A.',
        descricao: 'Cliente do setor varejista',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Startup 123',
        descricao: 'Cliente de tecnologia',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cliente', null, {});
  }
};