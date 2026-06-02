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
    await queryInterface.bulkInsert("Materiais", [
      {
        nome_material: "Cimento CP-II",
        descricao: "Saco de cimento 50kg",
        codigo_produto: "MAT-CIM-001",
        valor_unitario_cotado: 38.90,
        valor_unitario_adquirido: 41.50,
        unidade_medida: "saco",
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome_material: "Areia média",
        descricao: "Areia para construção",
        codigo_produto: "MAT-ARE-001",
        valor_unitario_cotado: 120.00,
        valor_unitario_adquirido: 130.00,
        unidade_medida: "m³",
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome_material: "Brita 1",
        descricao: "Brita para concreto",
        codigo_produto: "MAT-BRI-001",
        valor_unitario_cotado: 145.00,
        valor_unitario_adquirido: 150.00,
        unidade_medida: "m³",
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome_material: "Tijolo cerâmico",
        descricao: "Tijolo 8 furos",
        codigo_produto: "MAT-TIJ-001",
        valor_unitario_cotado: 0.85,
        valor_unitario_adquirido: 0.90,
        unidade_medida: "unidade",
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome_material: "Vergalhão CA-50",
        descricao: "Barra de aço 10mm",
        codigo_produto: "MAT-ACO-001",
        valor_unitario_cotado: 42.00,
        valor_unitario_adquirido: 44.50,
        unidade_medida: "barra",
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome_material: "Tinta acrílica",
        descricao: "Lata de tinta 18L",
        codigo_produto: "MAT-TIN-001",
        valor_unitario_cotado: 210.00,
        valor_unitario_adquirido: 225.00,
        unidade_medida: "lata",
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome_material: "Massa corrida",
        descricao: "Balde de massa 25kg",
        codigo_produto: "MAT-MAS-001",
        valor_unitario_cotado: 68.00,
        valor_unitario_adquirido: 72.00,
        unidade_medida: "balde",
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome_material: "Cabo elétrico 2,5mm",
        descricao: "Rolo de cabo flexível",
        codigo_produto: "MAT-CAB-001",
        valor_unitario_cotado: 185.00,
        valor_unitario_adquirido: 190.00,
        unidade_medida: "rolo",
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome_material: "Tubo PVC 100mm",
        descricao: "Tubo esgoto 6m",
        codigo_produto: "MAT-PVC-001",
        valor_unitario_cotado: 72.00,
        valor_unitario_adquirido: 76.50,
        unidade_medida: "unidade",
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome_material: "Argamassa AC-II",
        descricao: "Saco de argamassa 20kg",
        codigo_produto: "MAT-ARG-001",
        valor_unitario_cotado: 28.00,
        valor_unitario_adquirido: 30.00,
        unidade_medida: "saco",
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Materiais', null, {})
  }
};
