import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import { CreateUsuarioService } from "../../../Service/usuario.service";

export class CreateUsuarioController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest;

      const createUsuarioService = new CreateUsuarioService();

      const usuario = await createUsuarioService.create(body);

      return success({
        data: usuario,
        message: "Usuário cadastrado com sucesso.",
      });
    } catch (error: any) {
      if (error instanceof Error) {
        return badRequest(error.message);
      }
      return badRequest("Erro inesperado ao processar resposta interna");
    }
  }
}
