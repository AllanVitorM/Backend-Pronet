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
    await queryInterface.bulkInsert('PerfisColaboradores', [{
      idSindicato: 1,
      nome_cargo: "Pintor",
      descricao: "Responsável por serviços de pintura, acabamento e preparação de superfícies.",
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      idSindicato: 2,
      nome_cargo: "Pedreiro",
      descricao: "Responsável por execução de alvenaria, concretagem, assentamentos e serviços gerais de obra.",
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      idSindicato: 2,
      nome_cargo: "Servente de Obras",
      descricao: "Apoia os profissionais da obra no transporte de materiais, limpeza e preparação do ambiente.",
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      idSindicato: 3,
      nome_cargo: "Eletricista",
      descricao: "Responsável por instalações, manutenções e ajustes em sistemas elétricos.",
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      idSindicato: 4,
      nome_cargo: "Encanador",
      descricao: "Responsável por instalações hidráulicas, tubulações, conexões e manutenção de sistemas de água e esgoto.",
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      idSindicato: 5,
      nome_cargo: "Carpinteiro",
      descricao: "Responsável por estruturas de madeira, formas, escoramentos e serviços de carpintaria em obra.",
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      idSindicato: 6,
      nome_cargo: "Engenheiro Civil",
      descricao: "Responsável técnico pelo planejamento, acompanhamento e validação da execução da obra.",
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      idSindicato: 8,
      nome_cargo: "Mestre de Obras",
      descricao: "Coordena equipes em campo, acompanha a execução das atividades e orienta os trabalhadores da obra.",
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      idSindicato: 7,
      nome_cargo: "Técnico de Segurança do Trabalho",
      descricao: "Responsável por orientar e fiscalizar práticas de segurança, prevenção de acidentes e uso de EPIs.",
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    ]
    )
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('PerfisColaboradores', null, {})
  }
};
