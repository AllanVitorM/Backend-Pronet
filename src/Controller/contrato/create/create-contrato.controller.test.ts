import request from "supertest";
import app from "../../../app";
import { SequelizeHelper } from "../../../models/sequelize-helper";

const getData = (): any => {
  return {
    cliente: "any_Cliente",
    descricaoContrato: "any_descricaoContrato",
    tipoContrato: "any_tipoContrato",
    dataInicio: "2026-04-17",
    dataFinal: "2026-04-29",
    valorTotal: "2000.00",
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

    console.log(body)

    const response = await request(app)
      .post("/contrato/criarContrato")
      .send(body);

    console.log(response.body)

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Contrato cadastrado com sucesso.");
  });
});
