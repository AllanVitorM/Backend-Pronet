import request from "supertest";
import app from "../../../app";
import { SequelizeHelper } from "../../../models/sequelize-helper";

const getData = () => ({ idAtividade: 1, idAtividadeDependencia: 2 });

describe("create-atividades-dependencia.controller", () => {
  beforeAll(async () => { await SequelizeHelper.reset(); });
  afterAll(async () => { await SequelizeHelper.sequelize.close(); });

  it("Deve retornar 200 e criar dependência", async () => {
    const res = await request(app)
      .post("/atividades-dependencia/criarDependencia")
      .send(getData());
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Dependência entre atividades cadastrada com sucesso.");
  });
});