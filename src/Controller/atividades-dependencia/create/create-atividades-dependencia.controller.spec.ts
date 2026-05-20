import { HttpRequest, HttpResponse } from "../../../protocol/http.protocol";
import { CreateAtividadesDependenciaController } from "./create-atividades-dependencia.controller";

interface TypeSut { sut: CreateAtividadesDependenciaController }
const makeSut = (): TypeSut => ({ sut: new CreateAtividadesDependenciaController() });
const getData = () => ({ idAtividade: 1, idAtividadeDependencia: 2 });

describe("create-atividades-dependencia.controller", () => {
  it("Deve retornar 400 sem idAtividade", async () => {
    const { sut } = makeSut();
    const { idAtividade, ...body } = getData();
    const res = await sut.handle({ body });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toContain("idAtividade");
  });
  it("Deve retornar 400 sem idAtividadeDependencia", async () => {
    const { sut } = makeSut();
    const { idAtividadeDependencia, ...body } = getData();
    const res = await sut.handle({ body });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toContain("idAtividadeDependencia");
  });
  it("Deve retornar 200 com dados válidos", async () => {
    const { sut } = makeSut();
    const res = await sut.handle({ body: getData() });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Dependência entre atividades cadastrada com sucesso.");
  });
});