import {
  HttpRequest,
  HttpResponse,
  Controller,
} from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import { MarcoService } from "../../../Service/marco.service";

export class CreateMarcoController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest;

      const createMarcoService = new MarcoService();
      const marcoFinalizado = await createMarcoService.create(body);

      return success({
        data: marcoFinalizado,
        message: "Marco cadastrado com sucesso",
      });
    } catch (error) {
      if (error instanceof Error) {
        return badRequest(error.message);
      }
      return badRequest("Erro inesperado ao processar resposta interna");
    }
  }
}
