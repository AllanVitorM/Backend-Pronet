import {
  HttpRequest,
  HttpResponse,
  Controller,
} from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import PerfisColaboradoresRepository from "../../../models/PerfisColaboradores";
import SindicatoRepository from "../../../models/sindicato";

export class FindPerfisColaboradoresController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;

      const perfisColaborador = await PerfisColaboradoresRepository.findOne({
        where: {
          id: id,
          isDeleted: false,
        },
        include: [
          {
            model: SindicatoRepository,
            as: "sindicato",
          },
        ],
      });

      if (!perfisColaborador) {
        return badRequest("Perfil colaborador não encontrado");
      }

      return success({
        data: perfisColaborador,
      });
    } catch (error) {
      if (error instanceof Error) {
        return badRequest(error.message);
      }
      return badRequest("Erro inesperado ao processar resposta interna");
    }
  }
}
