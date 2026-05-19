import request from "supertest";
import app from "../../../app";
import { SequelizeHelper } from "../../../models/sequelize-helper";

const getData = (): any => {
  return {
    nome: "any_Cliente",
    descricao: "any_descricao",
  };
};

describe("create-cliente.controller", () => {
  beforeAll(async () => {
    await SequelizeHelper.reset();
  });
  afterAll(async () => {
    await SequelizeHelper.sequelize.close();
  });

  it("Deve retornar StatusCode 200 e criar o cliente com sucesso.", async () => {
    const body = getData();

    console.log(body);

    const response = await request(app)
      .post("/cliente/criarCliente")
      .send(body);

    console.log(response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Cliente cadastrado com sucesso.");
  });
});