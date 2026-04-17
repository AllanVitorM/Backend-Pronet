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
    descricaoContrato: "any_descricaoContrato",
    tipoContrato: "any_tipoContrato",
    dataInicio: "17/04/2026",
    dataFinal: "29/04/2026",
    valorTotal: 2000.00
  }
}

describe("create-contrato.controller", () => {
  it("Deve retornar statusCode 400 caso o campo cliente não seja preenchido", async() => {
    const {sut} = makeSut();
    const {cliente, ...body} = getData();

    const httpRequest: HttpRequest = {
      body: body,
    }
    const httpResponse: HttpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body.message).toBe("O campo cliente deve ser preenchido corretamente")
  })
})
