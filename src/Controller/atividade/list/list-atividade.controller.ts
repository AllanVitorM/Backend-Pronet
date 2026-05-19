import { Controller, HttpRequest, HttpResponse } from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import Atividade from "../../../models/atividade.model";
import Projeto from "../../../models/projetos.model";

export class ListAtividadeController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { limit = 10, page = 1 } = httpRequest?.query || {};
      const offset = (Number(page) - 1) * Number(limit);
      const { logged } = httpRequest;
      if (!logged) return badRequest("Usuário não autenticado");

      const { count, rows } = await Atividade.findAndCountAll({
        distinct: true,
        limit: Number(limit),
        offset,
        where: { isDeleted: false },
        include: [{ model: Projeto, as: "projeto" }],
      });
      return success({ data: rows, total: count, nPages: Math.ceil(count / Number(limit)) });
    } catch (error) {
      if (error instanceof Error) return badRequest(error.message);
      return badRequest("Erro inesperado");
    }
  }
}