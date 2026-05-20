import { HttpRequest, HttpResponse } from "../../../protocol/http.protocol";
import { CreateClienteController } from "./create-cliente.controller";

interface TypeSut {
  sut: CreateClienteController;
}

const makeSut = (): TypeSut => {
  return {
    sut: new CreateClienteController(),
  };
};

const getData = (): any => {
  return {
    nome: "any_Cliente",
    descricao: "any_descricao",
  };
};

describe("create-cliente.controller", () => {
  it("Deve retornar statusCode 400 caso o campo nome não seja preenchido", async () => {
    const { sut } = makeSut();
    const { nome, ...body } = getData();

    const httpRequest: HttpRequest = {
      body: body,
    };
    const httpResponse: HttpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body.message).toBe("O campo nome deve ser preenchido corretamente");
  });

  it("Deve retornar statusCode 400 caso o campo descricao não seja preenchido", async () => {
    const { sut } = makeSut();
    const { descricao, ...body } = getData();

    const httpRequest: HttpRequest = {
      body: body,
    };
    const httpResponse: HttpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body.message).toBe("O campo descrição deve ser preenchido corretamente");
  });
});