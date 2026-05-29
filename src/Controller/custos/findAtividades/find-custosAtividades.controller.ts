import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import { CustosAtividadeService } from "../../../Service/custosAtividade.service";

export class FindCustosAtividadeController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { idAtividade } = httpRequest.params;

      const idAtividadeNumber = Number(idAtividade);

      if (!idAtividade || isNaN(idAtividadeNumber)) {
        return badRequest("O idAtividade informado é inválido");
      }

      const custosAtividadeService = new CustosAtividadeService();

      const custos = await custosAtividadeService.calcular(idAtividadeNumber);

      return success({
        data: custos,
      });
    } catch (error) {
      if (error instanceof Error) {
        return badRequest(error.message);
      }

      return badRequest("Erro inesperado ao calcular custos da atividade");
    }
  }
}
