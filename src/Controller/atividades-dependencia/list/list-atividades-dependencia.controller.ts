import { Controller, HttpRequest, HttpResponse } from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import AtividadesDependencia from "../../../models/atividades-dependencia.model";
import Atividade from "../../../models/atividade.model";

export class ListAtividadesDependenciaController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { limit = 10, page = 1 } = httpRequest?.query || {};
      const offset = (Number(page) - 1) * Number(limit);
      const { logged } = httpRequest;
      if (!logged) return badRequest("Usuário não autenticado");

      const { count, rows } = await AtividadesDependencia.findAndCountAll({
        distinct: true,
        limit: Number(limit),
        offset,
        where: { isDeleted: false },
        include: [
          { model: Atividade, as: "atividade" },
          { model: Atividade, as: "atividadeDependencia" },
        ],
      });
      return success({ data: rows, total: count, nPages: Math.ceil(count / Number(limit)) });
    } catch (error) {
      if (error instanceof Error) return badRequest(error.message);
      return badRequest("Erro inesperado");
    }
  }
}