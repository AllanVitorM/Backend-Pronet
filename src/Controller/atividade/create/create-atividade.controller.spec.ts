import { HttpRequest, HttpResponse } from "../../../protocol/http.protocol";
import { CreateAtividadeController } from "./create-atividade.controller";

interface TypeSut { sut: CreateAtividadeController }
const makeSut = (): TypeSut => ({ sut: new CreateAtividadeController() });
const getData = (): any => ({
  nome: "Atividade X",
  status: "Em andamento",
  data_inicio: "2026-06-01",
  data_fim: "2026-06-10",
  idProjeto: 1,
});

describe("create-atividade.controller", () => {
  it("Deve retornar 400 se nome ausente", async () => {
    const { sut } = makeSut();
    const { nome, ...body } = getData();
    const res = await sut.handle({ body });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toContain("nome");
  });
  it("Deve retornar 200 com dados válidos", async () => {
    const { sut } = makeSut();
    const res = await sut.handle({ body: getData() });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Atividade cadastrada com sucesso.");
  });
});