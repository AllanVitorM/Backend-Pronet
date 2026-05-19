import { Controller, HttpRequest, HttpResponse } from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import AtividadesDependencia from "../../../models/atividades-dependencia.model";

export class CreateAtividadesDependenciaController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest;
      if (!body.idAtividade) return badRequest("O campo idAtividade é obrigatório");
      if (!body.idAtividadeDependencia) return badRequest("O campo idAtividadeDependencia é obrigatório");

      const dep = await AtividadesDependencia.create(body);
      return success({ data: dep, message: "Dependência entre atividades cadastrada com sucesso." });
    } catch (error: any) {
      console.error(error);
      return badRequest(error?.errors || error.message);
    }
  }
}