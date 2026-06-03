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
    await queryInterface.bulkInsert('PerfisResponsaveis', [{
      nome: "Gerente",
      descricao: "any_describre",
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: "Supervisor",
      descricao: "any_describe",
      isDeleted: false,
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
    await queryInterface.bulkDelete('PerfisResponsaveis', null, {})
  }
};
