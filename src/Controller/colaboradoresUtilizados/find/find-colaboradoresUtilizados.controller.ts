import {
  HttpRequest,
  HttpResponse,
  Controller,
} from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import ColaboradoresUtilizadosRepository from "../../../models/colaboradoresUtilizados.model";

export class FindColaboradoresUtilizadosController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;

      const colaboradoresUtilizados =
        await ColaboradoresUtilizadosRepository.findOne({
          where: {
            id,
            isDeleted: false,
          },
        });
      if (!colaboradoresUtilizados) {
        return badRequest("Colaboradores não encontrados");
      }
      return success({
        data: colaboradoresUtilizados,
      });
    } catch (error) {
      if (error instanceof Error) {
        return badRequest(error.message);
      }
      return badRequest("Erro inesperado ao processar resposta interna");
    }
  }
}
