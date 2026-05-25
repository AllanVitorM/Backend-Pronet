import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import { MateriaisPlanejadoService } from "../../../Service/materiaisPlanejado.service";

export class CreateMateriaisPlanejadoController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body, logged, params } = httpRequest;

      if (!logged) {
        return badRequest("Usuário não autenticado");
      }

      const { idAtividade } = params;

      if (!idAtividade) {
        return badRequest("É necessário informar a atividade");
      }
      
      const createMateriaisPlanejadoService = new MateriaisPlanejadoService();

      const materiaisPlanejado = await createMateriaisPlanejadoService.create({
        ...body,
        idAtividade: Number(idAtividade),
      });

      return success({
        data: materiaisPlanejado,
        message: "Materiais planejados registrado com sucesso",
      });
    } catch (error) {
      if (error instanceof Error) {
        return badRequest(error.message);
      }
      return badRequest("Erro inesperado ao processar resposta interna");
    }
  }
}
