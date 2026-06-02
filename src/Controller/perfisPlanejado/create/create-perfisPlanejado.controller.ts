import {
  HttpRequest,
  HttpResponse,
  Controller,
} from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import { PerfisPlanejadoService } from "../../../Service/perfisPlanejado.service";

export class CreatePerfisPlanejadoController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body, params } = httpRequest;

      const { idAtividade } = params;

      if (!idAtividade) {
        return badRequest("É necessário informar a atividade");
      }

      const createPerfisPlanejadoService = new PerfisPlanejadoService();

      const perfisPlanejado = await createPerfisPlanejadoService.create({
        ...body,
        idAtividade: Number(idAtividade),
      });

      return success({
        data: perfisPlanejado,
        message: "Perfis planejado registrado com sucesso",
      });
    } catch (error) {
      if (error instanceof Error) {
        return badRequest(error.message);
      }
      return badRequest("Erro inesperado ao processar resposta interna");
    }
  }
}
