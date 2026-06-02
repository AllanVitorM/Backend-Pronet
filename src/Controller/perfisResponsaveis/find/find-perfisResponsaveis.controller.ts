import {
  HttpRequest,
  HttpResponse,
  Controller,
} from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import PerfisResponsaveisRepository from "../../../models/perfisResponsaveis.model";

export class FindPerfisResponsaveisController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;

      const perfisResponsaveis = await PerfisResponsaveisRepository.findOne({
        where: {
          id: id,
          isDeleted: false,
        },
      });

      if(!perfisResponsaveis) {
        return badRequest("Perfil planejado não encontrado")
      }

      return success({
        data: perfisResponsaveis
      })
    } catch (error) {
      if (error instanceof Error) {
        return badRequest(error.message);
      }
      return badRequest("Erro inesperado ao processar resposta interna");
    }
  }
}
