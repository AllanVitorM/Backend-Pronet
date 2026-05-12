import { HttpRequest, HttpResponse } from "../../../protocol/http.protocol";
import { CreateProjetoController } from "./create-projetos.controller";

interface TypeSut {
  sut: CreateProjetoController;
}

const makeSut = (): TypeSut => {
  return {
    sut: new CreateProjetoController(),
  };
};

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

describe("create-projetos.controller", () => {
  it("Deve retornar statusCode 200 funcionando a criação do projeto", async () => {
    const { sut } = makeSut();
    const  body = getData();

    const httpRequest: HttpRequest = {
      body,
    };
    const httpResponse: HttpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body.message).toBe("Projeto cadastrado com sucesso.");
  });

  it("Deve retoranr statusCode 200 com data início e data final real adicionadas", async () => {
    const { sut } = makeSut();
    const body = {
      ...getData(),
      data_inicio_real: "2026-05-12",
      data_fim_real: "2026-06-02",
    };

    const httpRequest: HttpRequest = {
      body,
    };
    const httpResponse: HttpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body.message).toBe("Projeto cadastrado com sucesso.");
  });
});
