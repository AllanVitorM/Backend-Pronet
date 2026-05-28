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
      const { idProjeto } = httpRequest.query;

      if (!idProjeto) {
        return badRequest("É necessário informar o projeto");
      }

      const idProjetoNumber = Number(idProjeto);

      if (isNaN(idProjetoNumber)) {
        return badRequest("O idProjeto informado é inválido");
      }
      
      const { count, rows } = await AtividadesRepository.findAndCountAll({
        distinct: true,
        limit: Number(limit),
        offset: offset,
        where: {
          idProjeto: Number(idProjeto),
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
