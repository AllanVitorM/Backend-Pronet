import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import ClienteRepository from "../../../models/cliente.model";

export class FindClienteController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;

      const cliente = await ClienteRepository.findOne({
        where: {
          id,
          isDeleted: false,
        },
      });

      if (!cliente) return badRequest("Cliente não encontrado");

      return success({ data: cliente });
    } catch (error) {
      if (error instanceof Error) {
        return badRequest(error.message);
      }
      return badRequest("Erro inesperado ao processar resposta interna");
    }
  }
}