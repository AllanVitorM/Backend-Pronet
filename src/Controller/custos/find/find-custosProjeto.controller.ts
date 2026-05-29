import {
  HttpRequest,
  HttpResponse,
  Controller,
} from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import { CustosProjetoService } from "../../../Service/custosProjeto.service";

export class FindCustosProjetoController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { idProjeto } = httpRequest.params;

      if (!idProjeto) {
        return badRequest("É necessário informar o projeto");
      }

      const idProjetoNumber = Number(idProjeto);

      if (isNaN(idProjetoNumber)) {
        return badRequest("O idProjeto informado é inválido");
      }

      const custosProjetoService = new CustosProjetoService();

      const custos =
        await custosProjetoService.calcularPorProjeto(idProjetoNumber);

      return success({
        data: custos,
      });
    } catch (error) {
      if (error instanceof Error) {
        return badRequest(error.message);
      }

      return badRequest("Erro inesperado ao calcular custos do projeto");
    }
  }
}
