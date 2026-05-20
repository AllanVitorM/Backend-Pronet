import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import { CreateProjetoService } from "../../../Service/projetos.service";

export class CreateProjetoController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest;

      const createProjetoService = new CreateProjetoService();

      const projetoFinalizado = await createProjetoService.create(body);

      return success({
        data: projetoFinalizado,
        message: "Projeto cadastrado com sucesso.",
      });
    } catch (error: any) {
      if (error instanceof Error) {
        return badRequest(error.message);
      }
      return badRequest("Erro inesperado ao processar resposta interna");
    }
  }
}
