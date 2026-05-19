import { Controller, HttpRequest, HttpResponse } from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import AtividadesDependencia from "../../../models/atividades-dependencia.model";
import Atividade from "../../../models/atividade.model";

export class FindAtividadesDependenciaController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;
      const dep = await AtividadesDependencia.findOne({
        where: { id, isDeleted: false },
        include: [
          { model: Atividade, as: "atividade" },
          { model: Atividade, as: "atividadeDependencia" },
        ],
      });
      if (!dep) return badRequest("Dependência não encontrada");
      return success({ data: dep });
    } catch (error) {
      if (error instanceof Error) return badRequest(error.message);
      return badRequest("Erro inesperado");
    }
  }
}