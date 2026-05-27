import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import { CreatePerfisPlanejadoService } from "../../../Service/perfisPlanejado.service";

export class CreatePerfisPlanejadoController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest;

      const createPerfisPlanejadoService = new CreatePerfisPlanejadoService();

      const perfisPlanejado = await createPerfisPlanejadoService.create(body);

      return success({
        data: perfisPlanejado,
        message: "Perfil planejado cadastrado com sucesso.",
      });
    } catch (error: any) {
      console.error(error);
      return badRequest(error?.errors || error.message);
    }
  }
}