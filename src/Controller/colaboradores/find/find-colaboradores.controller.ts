import {
  HttpRequest,
  HttpResponse,
  Controller,
} from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import ColaboradoresRepository from "../../../models/colaboradores";
import PerfisColaboradoresRepository from "../../../models/PerfisColaboradores";

export class FindColaboradoresController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;

      const colaboradores = await ColaboradoresRepository.findOne({
        where: {
          id,
          isDeleted: false,
        },
        include: [
          {
            model: PerfisColaboradoresRepository,
            as: "perfilColaborador",
          },
        ],
      });
      if (!colaboradores) {
        return badRequest("Não há um diário de obra.");
      }

      return success({
        data: colaboradores,
      });
    } catch (error) {
      if (error instanceof Error) {
        return badRequest(error.message);
      }
      return badRequest("Erro inesperado ao processar resposta interna");
    }
  }
}
