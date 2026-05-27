import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import { CreatePerfisResponsaveisService } from "../../../Service/perfisResponsaveis.service";

export class CreatePerfisResponsaveisController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest;

      const createPerfisResponsaveisService = new CreatePerfisResponsaveisService();

      const perfisResponsaveis = await createPerfisResponsaveisService.create(body);

      return success({
        data: perfisResponsaveis,
        message: "Perfil de responsável cadastrado com sucesso.",
      });
    } catch (error: any) {
      console.error(error);
      return badRequest(error?.errors || error.message);
    }
  }
}