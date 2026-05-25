import { HttpRequest, HttpResponse, Controller } from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import { CreateColaboradoresUtilizadosService } from "../../../Service/colaboradoresUtilizados.service";

export class CreateColaboradoresUtilizadosController implements Controller{
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const {body } = httpRequest;

      const createColaboradoresUtilizadosService = new CreateColaboradoresUtilizadosService();

      const colaboradoresUtilizadosFinalizado = await createColaboradoresUtilizadosService.create(body);

      return success({
        data: colaboradoresUtilizadosFinalizado,
        message: "Cadastrado com sucesso!",
      })
    } catch (error) {
      if (error instanceof Error) {
        return badRequest(error.message);
      }
      return badRequest("Erro inesperado ao processar resposta interna");
    }
  }
}
