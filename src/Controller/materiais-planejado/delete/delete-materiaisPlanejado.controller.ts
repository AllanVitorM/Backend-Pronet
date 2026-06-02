import {
  HttpRequest,
  HttpResponse,
  Controller,
} from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import MateriaisPlanejadoRepository from "../../../models/materiaisPlanejado.model";

export class DeleteMateriaisPlanejadoController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;

      if (!id) {
        return badRequest("É necessário informar o ID do material planejado");
      }

      const planejado = await MateriaisPlanejadoRepository.findOne({
        where: {
          id: Number(id),
          isDeleted: false,
        },
      });

      if (!planejado) {
        return badRequest("Material planejado não encontrado");
      }

      await planejado.update({ isDeleted: true });

      return success({
        message: "Material planejado removido com sucesso",
      });
    } catch (error) {
      if (error instanceof Error) {
        return badRequest(error.message);
      }
      return badRequest("Erro inesperado ao processar resposta interna");
    }
  }
}
