import PerfisColaboradoresRepository from "../../../models/PerfisColaboradores";
import { badRequest, success } from "../../../helpers";
import {
  HttpRequest,
  HttpResponse,
  Controller,
} from "../../../protocol/http.protocol";
import SindicatoRepository from "../../../models/sindicato";

export class ListPerfisColaboradoresController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { limit = 10, page = 1 } = httpRequest.query || {};
      const { idSindicato } = httpRequest.params;

      if (!idSindicato) {
        return badRequest("É necessário informar o sindicato");
      }

      const offset = (Number(page) - 1) * Number(limit);

      const { count, rows } =
        await PerfisColaboradoresRepository.findAndCountAll({
          distinct: true,
          limit: Number(limit),
          offset: offset,
          where: {
            idSindicato: Number(idSindicato),
            isDeleted: false,
          },
          include: [
            {
              model: SindicatoRepository,
              as: "sindicato",
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
