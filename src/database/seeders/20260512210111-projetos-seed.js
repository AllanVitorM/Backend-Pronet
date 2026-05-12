'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Projetos', [{
      nome: "any_nome",
      data_inicio_planejada: new Date(),
      data_fim_planejada: new Date(),
      status: "any_status",
      numero_pedido: 999999,
      ART: 9999999999999,
      data_inicio_real: new Date(),
      data_fim_real: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Projetos', null, {})
  }
};
