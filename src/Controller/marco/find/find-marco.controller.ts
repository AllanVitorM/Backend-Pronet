import {
  HttpRequest,
  HttpResponse,
  Controller,
} from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import { MarcoRepository } from "../../../models/marco.model";

export class FindMarcoController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;

      const marco = await MarcoRepository.findOne({
        where: {
          id,
          isDeleted: false,
        },
      });
      if (!marco) {
        return badRequest("Não há um diário de obra.");
      }

      return success({
        data: marco,
      });
    } catch (error) {
      if (error instanceof Error) {
        return badRequest(error.message);
      }
      return badRequest("Erro inesperado ao processar resposta interna");
    }
  }
}
