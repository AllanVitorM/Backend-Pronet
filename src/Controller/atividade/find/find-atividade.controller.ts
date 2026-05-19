import { Controller, HttpRequest, HttpResponse } from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import Atividade from "../../../models/atividade.model";
import Projeto from "../../../models/projetos.model";

export class FindAtividadeController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;
      const atividade = await Atividade.findOne({
        where: { id, isDeleted: false },
        include: [{ model: Projeto, as: "projeto" }],
      });
      if (!atividade) return badRequest("Atividade não encontrada");
      return success({ data: atividade });
    } catch (error) {
      if (error instanceof Error) return badRequest(error.message);
      return badRequest("Erro inesperado");
    }
  }
}