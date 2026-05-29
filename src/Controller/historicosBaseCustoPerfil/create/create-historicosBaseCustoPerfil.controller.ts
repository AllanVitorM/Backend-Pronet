import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import { HistoricosBaseCustoPerfilService } from "../../../Service/historicosBaseCustoPerfil.service";

export class CreateHistoricoBaseCustoPerfilController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest;

      const historicosBaseCustoPerfilService =
        new HistoricosBaseCustoPerfilService();

      const historico = await historicosBaseCustoPerfilService.create(body);

      return success({
        data: historico,
        message: "Histórico de base de custo do perfil criado com sucesso",
      });
    } catch (error) {
      if (error instanceof Error) {
        return badRequest(error.message);
      }

      return badRequest("Erro inesperado ao processar resposta interna");
    }
  }
}
