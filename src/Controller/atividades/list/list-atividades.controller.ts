import AtividadesRepository from "../../../models/atividades.model";
import {
  HttpRequest,
  HttpResponse,
  Controller,
} from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";

export class ListAtividadesController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { limit = 10, page = 1 } = httpRequest.query || {};
      const offset = (Number(page) - 1) * Number(limit);
      const { logged } = httpRequest;

      if (!logged) return badRequest("Usuário não autenticado");

      const { count, rows } = await AtividadesRepository.findAndCountAll({
        distinct: true,
        limit: Number(limit),
        offset: offset,
        where: {
          isDeleted: false,
        },
      });
      const nPages = Math.ceil(count / Number(limit));

      return success({
        data: rows,
        total: count,
        nPages,
      });
    } catch (error) {
      if (error instanceof Error) {
        return badRequest(error.message);
      }
      return badRequest("Erro inesperado ao processar resposta interna");
    }
  }
}
