import request from "supertest";
import app from "../../../app";
import { SequelizeHelper } from "../../../models/sequelize-helper";

const getData = (): any => {
  return {
    escopo_contratual: "any_escopo_contratual",
    data_inicio: "2026-04-17",
    data_fim: "2026-04-29",
    valor_total: 2000.00,
    status_contratual:"em andamento"
  };
};

describe("create-contrato.controller", () => {
  beforeAll(async () => {
    await SequelizeHelper.reset();
  });
  afterAll(async () => {
    await SequelizeHelper.sequelize.close();
  })
  it("Deve retornar StatusCode 200 e criar o contrato com sucesso.", async () => {
    const { ...body } = getData();

    const response = await request(app)
      .post("/contrato/criarContrato")
      .send(body);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Contrato cadastrado com sucesso.");
  });
});
