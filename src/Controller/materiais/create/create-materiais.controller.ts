import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import { CreateMaterialService } from "../../../Service/material.service";

export class CreateMaterialController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest;

      const createMaterialService = new CreateMaterialService();

      const material = await createMaterialService.create(body);

      return success({
        data: material,
        message: "Material cadastrado com sucesso.",
      });
    } catch (error: any) {
      if (error instanceof Error) {
        return badRequest(error.message);
      }
      return badRequest("Erro inesperado ao processar resposta interna");
    }
  }
}
