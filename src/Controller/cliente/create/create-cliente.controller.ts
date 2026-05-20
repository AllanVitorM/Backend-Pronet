import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import Cliente from "../../../models/cliente.model";

export class CreateClienteController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest;

      if (!body.nome) {
        return badRequest("O campo nome deve ser preenchido corretamente");
      }

      if (!body.descricao) {
        return badRequest("O campo descrição deve ser preenchido corretamente");
      }

      const clienteCriado = await Cliente.create(body);

      return success({
        data: clienteCriado,
        message: "Cliente cadastrado com sucesso.",
      });
    } catch (error: any) {
      console.error(error);
      return badRequest(error?.errors || error.message);
    }
  }
}