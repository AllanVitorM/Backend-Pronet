import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import { CreateContratoService } from "../../../Service/contrato.service";

export class CreateContratoController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest;

      const createContratoService = new CreateContratoService();

      const contratoFinalizado = await createContratoService.create(body);

      return success({
        data: contratoFinalizado,
        message: "Contrato cadastrado com sucesso.",
      });
    } catch (error: any) {
      if (error instanceof Error) {
        return badRequest(error.message);
      }
      return badRequest("Erro inesperado ao processar resposta interna");
    }
  }
}
