import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import ContratoRepository from "../../../models/contrato.model";

export class CreateContratoController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest;

      if (!body.cliente) {
        return badRequest("O campo cliente deve ser preenchido corretamente");
      }

      if (!body.descricaoContrato) {
        return badRequest(
          "O campo descrição de contrato deve ser preenchido corretamente",
        );
      }

      if (!body.tipoContrato) {
        return badRequest(
          "O campo tipo de contrato deve ser selecionado corretamente.",
        );
      }

      if (!body.dataInicio) {
        return badRequest("Selecione uma data de início");
      }

      if (!body.dataFinal) {
        return badRequest("Selecione uma data final.");
      }

      if (!body.valorTotal) {
        return badRequest("Adicione o valor total do contrato.");
      }

      if (new Date(body.dataFinal) <= new Date(body.dataInicio)) {
        return badRequest(
          "A data final não pode ser maior ou igual a data de início. Adicione um prazo maior.",
        );
      }

      const contratoFinalizado = await ContratoRepository.create(body);

      return success({
        data: contratoFinalizado,
        message: "Contrato cadastrado com sucesso.",
      });
    } catch (error: any) {
      console.error(error);
      return badRequest(error?.errors || error.message);
    }
  }
}
