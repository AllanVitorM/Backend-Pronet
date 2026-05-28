import {
  HttpRequest,
  HttpResponse,
  Controller,
} from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import ColaboradoresRepository from "../../../models/colaboradores";
import PerfisColaboradoresRepository from "../../../models/PerfisColaboradores";

export class ListColaboradoresController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { limit = 10, page = 1 } = httpRequest?.query || {};
      const offset = (Number(page) - 1) * Number(limit);

      const { count, rows } = await ColaboradoresRepository.findAndCountAll({
        distinct: true,
        limit: Number(limit),
        offset: offset,
        where: {
          isDeleted: false,
        },
        include: [
          {
            model: PerfisColaboradoresRepository,
            as: "perfilColaborador",
          },
        ],
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
