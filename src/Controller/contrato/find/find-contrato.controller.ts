import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import ContratoRepository from "../../../models/contrato.model";

export class FindContratoController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;

      const contrato = await ContratoRepository.findOne({
        where: {
          id,
          isDeleted: false,
        },
      });

      if (!contrato) return badRequest("Contrato não encontrado");

      return success({ data: contrato });
    } catch (error) {
      if (error instanceof Error) {
        return badRequest(error.message);
      }
      return badRequest("Erro inesperado ao processar resposta interna");
    }
  }
}
