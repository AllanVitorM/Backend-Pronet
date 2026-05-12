import { HttpRequest, HttpResponse } from "../../../protocol/http.protocol";
import { CreateContratoController } from "./create-contrato.controller";
import { FindOptions, Model } from "sequelize";

interface TypeSut {
  sut: CreateContratoController;
}

const makeSut = (): TypeSut => {
  return {
    sut: new CreateContratoController(),
  }
}

const getData = (): any => {
  return {
    cliente: "any_Cliente",
    escopo_contratual: "any_descricaoContrato",
    tipoContrato: "any_tipoContrato",
    data_inicio: "2026-04-17",
    data_fim: "2026-04-29",
    valor_total: 20000.00
  }
}

describe("create-contrato.controller", () => {
  it("Deve retornar statusCode 400 caso o campo cliente não seja preenchido", async() => {
    const {sut} = makeSut();
    const {escopo_contratual, ...body} = getData();

    const httpRequest: HttpRequest = {
      body: body,
    }
    const httpResponse: HttpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body.message).toBe("É preciso adicionar um escopo contratual")
  })
  it("Deve retornar statusCode 200, criando o contrato", async() =>{
    const {sut} = makeSut();
    const body = getData();

    const httpRequest: HttpRequest = {
      body: body,
    }

    const httpResponse: HttpResponse = await sut.handle(httpRequest);
    console.log(httpResponse.body.message);
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body.message).toBe("Contrato cadastrado com sucesso.")
  })
})
