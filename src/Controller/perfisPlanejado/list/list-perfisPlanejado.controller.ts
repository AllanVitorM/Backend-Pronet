import {
  HttpRequest,
  HttpResponse,
  Controller,
} from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import PerfisPlanejadoRepository from "../../../models/perfisPlanejado.model";
import AtividadesRepository from "../../../models/atividades.model";
import PerfisColaboradoresRepository from "../../../models/PerfisColaboradores";

export class ListPerfisPlanejadoController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { idAtividade } = httpRequest.params;
      const { limit = 10, page = 1 } = httpRequest.query || {};

      if (!idAtividade) {
        return badRequest("É necessário informar a atividade");
      }

      const offset = (Number(page) - 1) * Number(limit);

      const { count, rows } = await PerfisPlanejadoRepository.findAndCountAll({
        distinct: true,
        limit: Number(limit),
        offset: offset,
        where: {
          idAtividade: Number(idAtividade),
          isDeleted: false,
        },
        include: [
          {
            model: AtividadesRepository,
            as: "atividade",
          },
          {
            model: PerfisColaboradoresRepository,
            as: "perfisColaborador",
          },
        ],
        order: [["createdAt", "DESC"]],
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
