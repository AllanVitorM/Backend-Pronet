import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import { DiariosObraAtividadeService } from "../../../Service/diariosObraAtividades.service";

export class DiariosObraAtividadesController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body, params, logged } = httpRequest;

      if (!logged) return badRequest("Usuário não autenticado");

      const { idDiarioObra } = params;

      if (!idDiarioObra) {
        return badRequest("É necessário informar o diário de obra");
      }

      const diariosObrasAtividadesService = new DiariosObraAtividadeService();

      const registro = await diariosObrasAtividadesService.create({
        ...body,
        idDiarioObra: Number(idDiarioObra),
      });

      return success({
        data: registro,
        message: "Atividade vinculada ao diário de obra com sucesso.",
      });
    } catch (error) {
      if (error instanceof Error) {
        return badRequest(error.message);
      }
      return badRequest("Erro inesperado ao processar resposta interna");
    }
  }
}
