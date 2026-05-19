import {
  HttpRequest,
  HttpResponse,
  Controller,
} from "../../../protocol/http.protocol";
import { CreateAtividadesService } from "../../../Service/atividades.service";
import { badRequest, success } from "../../../helpers";

export class AtividadesController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest;

      const createAtividadesService = new CreateAtividadesService();

      const atividadesFinalizado = await createAtividadesService.create(body);

      return success({
        data: atividadesFinalizado,
        message: "Atividade cadastrada com sucesso",
      });
    } catch (error) {
      if (error instanceof Error) {
        return badRequest(error.message);
      }
      return badRequest("Erro inesperado ao processar resposta interna");
    }
  }
}
