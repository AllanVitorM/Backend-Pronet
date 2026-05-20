import {
  HttpRequest,
  HttpResponse,
  Controller,
} from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import AtividadesRepository from "../../../models/atividades.model";

export class FindAtividadesController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;
      const { logged } = httpRequest;

      if (!logged) return badRequest("Usuário não autenticado");

      const atividades = await AtividadesRepository.findOne({
        where: {
          id,
          isDeleted: false,
        },
      });

      if (!atividades) {
        return badRequest("Essa atividade não está cadastrada");
      }

      return success({
        data: atividades,
      });
    } catch (error) {
      if (error instanceof Error) {
        return badRequest(error.message);
      }
      return badRequest("Erro inesperado ao processar resposta interna");
    }
  }
}
