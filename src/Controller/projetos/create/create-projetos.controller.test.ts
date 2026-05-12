import request from "supertest"
import app from "../../../app"
import { SequelizeHelper } from "../../../models/sequelize-helper"


const getData = (): any => {
  return {
    nome: "any_nome",
    data_inicio_planejada: "2026-05-12",
    data_fim_planejada: "2026-05-30",
    status: "any_status",
    numero_pedido: "any_numero",
    ART: "9999999999999",
  };
};

describe("create-projeto.controller", () => {
  beforeAll(async() => {
    await SequelizeHelper.reset();
  });
  afterAll(async () => {
    await SequelizeHelper.sequelize.close();
  })

  it("Deve retornar statusCode 200 criando o projeto com sucesso", async() => {
    const body = getData();

    const response = await request(app).post("/projetos/criarProjetos").send(body);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Projeto cadastrado com sucesso.")
  })
})
