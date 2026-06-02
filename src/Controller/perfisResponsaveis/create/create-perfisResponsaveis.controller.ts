import { CreatePerfisResponsaveisService } from "../../../Service/perfisResponsaveis.service";
import { badRequest, success } from "../../../helpers";
import {
  HttpRequest,
  HttpResponse,
  Controller,
} from "../../../protocol/http.protocol";

export class CreatePerfisResponsaveisController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest;

      const createPerfisResponsaveis = new CreatePerfisResponsaveisService();

      const perfisResponsaveis = createPerfisResponsaveis.create(body);

      return success({
        data: perfisResponsaveis,
        message: "Perfil responsável criado com sucesso",
      });
    } catch (error) {
      if (error instanceof Error) {
        return badRequest(error.message);
      }
      return badRequest("Erro inesperado ao processar resposta interna");
    }
  }
}
