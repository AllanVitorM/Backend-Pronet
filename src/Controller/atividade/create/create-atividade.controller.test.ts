import request from "supertest";
import app from "../../../app";
import { SequelizeHelper } from "../../../models/sequelize-helper";

const getData = () => ({
  nome: "Atividade Teste",
  status: "Em andamento",
  data_inicio: "2026-06-01",
  data_fim: "2026-06-10",
  idProjeto: 1,
});

describe("create-atividade.controller", () => {
  beforeAll(async () => { await SequelizeHelper.reset(); });
  afterAll(async () => { await SequelizeHelper.sequelize.close(); });

  it("Deve retornar 200 e criar atividade", async () => {
    const res = await request(app).post("/atividade/criarAtividade").send(getData());
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Atividade cadastrada com sucesso.");
  });
});