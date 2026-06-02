import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import { CreateMateriaisUtilizadosService } from "../../../Service/materiaisUtilizados.service";

export class CreateMaterialUtilizadoController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body, params } = httpRequest;

      const { idAtividade } = params;

      if (!idAtividade) {
        return badRequest("É necessário informar a atividade");
      }

      const createMaterialUtilizadoService =
        new CreateMateriaisUtilizadosService();

      const materialUtilizado = await createMaterialUtilizadoService.create({
        ...body,
        idAtividade: Number(idAtividade),
      });

      return success({
        data: materialUtilizado,
        message: "Material utilizado registrado com sucesso",
      });
    } catch (error) {
      if (error instanceof Error) {
        return badRequest(error.message);
      }
      return badRequest("Erro inesperado ao processar resposta interna");
    }
  }
}
