import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "../../../protocol/http.protocol";
import ContratoRepository from "../../../models/contrato.model";
import { badRequest, success } from "../../../helpers";
import ProjetosContratosRepository from "../../../models/ProjetosContratos";
import ClienteRepository from "../../../models/cliente.model";
import ProjetoRepository from "../../../models/projetos.model";

export class ListContratoController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { limit = 10, page = 1 } = httpRequest?.query || {};
      const offset = (Number(page) - 1) * Number(limit);
      const { logged } = httpRequest;

      if (!logged) return badRequest("Usuário não autenticado");

      const { count, rows } = await ContratoRepository.findAndCountAll({
        distinct: true,
        limit: Number(limit),
        offset: offset,
        where: {
          isDeleted: false,
        },
        include: [
          {
            model: ClienteRepository,
            as: "cliente",
          },
          {
            model: ProjetosContratosRepository,
            as: "projetosContratos",
            include: [
              {
                model: ProjetoRepository,
                as: "projeto",
              },
            ],
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
