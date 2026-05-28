import {
  HttpRequest,
  HttpResponse,
  Controller,
} from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import { ColaboradoresService } from "../../../Service/colaboradores.service";

export class CreateColaboradoresController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest;

      const createColaboradoresService = new ColaboradoresService();
      const colaboradores = await createColaboradoresService.create(body);

      return success({
        data: colaboradores,
        message: "Colaborador cadastrado com sucesso",
      });
    } catch (error) {
      if (error instanceof Error) {
        return badRequest(error.message);
      }
      return badRequest("Erro inesperado ao processar resposta interna");
    }
  }
}
