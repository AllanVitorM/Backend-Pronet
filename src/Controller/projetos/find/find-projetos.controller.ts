import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import ProjetoRepository from "../../../models/projetos.model";

export class FindProjetosController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;

      const projetos = await ProjetoRepository.findOne({
        where: {
          id,
          isDeleted: false,
        },
      });

      if(!projetos) return badRequest("Projetos não encontrados")

      return success({
        data: projetos,
      });
    } catch (error) {
      if(error instanceof Error) {
        return badRequest(error.message);
      }
      return badRequest("Erro inesperado ao processar resposta interna")
    }
  }
}
