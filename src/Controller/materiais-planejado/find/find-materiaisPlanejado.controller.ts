import {
  HttpRequest,
  HttpResponse,
  Controller,
} from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import MateriaisPlanejadoRepository from "../../../models/materiaisPlanejado.model";

export class FindMateriaisPlanejadoController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;

      const planejado = await MateriaisPlanejadoRepository.findOne({
        where: {
          id: id,
          isDeleted: false,
        },
      });
      if (!planejado) {
        return badRequest("O material planejado não existe");
      }

      return success({
        data: planejado,
      });
    } catch (error) {
      if (error instanceof Error) {
        return badRequest(error.message);
      }
      return badRequest("Erro inesperado ao processar resposta interna");
    }
  }
}
