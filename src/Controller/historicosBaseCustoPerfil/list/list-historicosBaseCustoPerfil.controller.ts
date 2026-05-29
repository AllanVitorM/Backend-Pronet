import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import HistoricosBaseCustoPerfilRepository from "../../../models/historicoBaseCustoPerfis.model";
import PerfisColaboradoresRepository from "../../../models/PerfisColaboradores";

export class ListHistoricoBaseCustoPerfilController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const {
        limit = 10,
        page = 1,
        idPerfilColaborador,
      } = httpRequest.query || {};

      const limitNumber = Number(limit);
      const pageNumber = Number(page);

      if (isNaN(limitNumber) || limitNumber <= 0) {
        return badRequest("O limit informado é inválido");
      }

      if (isNaN(pageNumber) || pageNumber <= 0) {
        return badRequest("A page informada é inválida");
      }

      const where: any = {
        isDeleted: false,
      };

      if (idPerfilColaborador) {
        const idPerfilColaboradorNumber = Number(idPerfilColaborador);

        if (isNaN(idPerfilColaboradorNumber)) {
          return badRequest("O idPerfilColaborador informado é inválido");
        }

        where.idPerfilColaborador = idPerfilColaboradorNumber;
      }

      const offset = (pageNumber - 1) * limitNumber;

      const { count, rows } =
        await HistoricosBaseCustoPerfilRepository.findAndCountAll({
          distinct: true,
          limit: limitNumber,
          offset,
          where,
          include: [
            {
              model: PerfisColaboradoresRepository,
              as: "perfilColaborador",
            },
          ],
          order: [["date_inicio_vigencia", "DESC"]],
        });

      const nPages = Math.ceil(count / limitNumber);

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
