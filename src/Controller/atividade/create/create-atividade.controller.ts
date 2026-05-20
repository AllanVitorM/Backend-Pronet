import { Controller, HttpRequest, HttpResponse } from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import Atividade from "../../../models/atividade.model";

export class CreateAtividadeController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest;

      if (!body.nome) return badRequest("O campo nome deve ser preenchido");
      if (!body.status) return badRequest("O campo status deve ser preenchido");
      if (!body.data_inicio) return badRequest("Selecione uma data de início");
      if (!body.data_fim) return badRequest("Selecione uma data final");
      if (!body.idProjeto) return badRequest("Informe o projeto relacionado");

      const atividade = await Atividade.create(body);
      return success({ data: atividade, message: "Atividade cadastrada com sucesso." });
    } catch (error: any) {
      console.error(error);
      return badRequest(error?.errors || error.message);
    }
  }
}