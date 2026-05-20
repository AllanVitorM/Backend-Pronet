import {
  HttpRequest,
  HttpResponse,
  Controller,
} from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import DiarioObraRepository from "../../../models/diarioobra.models";

export class FindDiarioObraController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;

      const diarioObra = await DiarioObraRepository.findOne({
        where: {
          id,
          isDeleted: false,
        },
      });
      if (!diarioObra) {
        return badRequest("Não há um diário de obra.");
      }

      return success({
        data: diarioObra,
      });
    } catch (error) {
      if (error instanceof Error) {
        return badRequest(error.message);
      }
      return badRequest("Erro inesperado ao processar resposta interna");
    }
  }
}
