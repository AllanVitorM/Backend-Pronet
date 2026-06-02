import { CreatePerfisColaboradoresService } from "../../../Service/perfisColaboradores.service";
import {
  HttpRequest,
  HttpResponse,
  Controller,
} from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";

export class CreatePerfisColaboradoresController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body, params } = httpRequest;

      const { idSindicato } = params;

      if (!idSindicato) {
        return badRequest("É necessário informar o sindicato");
      }

      const createPerfisColaboradoresService =
        new CreatePerfisColaboradoresService();

      const perfisColaboradores = createPerfisColaboradoresService.create({
        ...body,
        idSindicato: Number(idSindicato),
      });

      return success({
        data: perfisColaboradores,
        message: "Perfis colaboradores registrado com sucesso",
      });
    } catch (error) {
      if (error instanceof Error) {
        return badRequest(error.message);
      }
      return badRequest("Erro inesperado ao processar resposta interna");
    }
  }
}
