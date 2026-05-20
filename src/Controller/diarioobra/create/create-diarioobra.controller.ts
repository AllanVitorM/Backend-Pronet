import { HttpRequest,HttpResponse,Controller }from "../../../protocol/http.protocol";
import { CreateDiarioObraService } from "../../../Service/diarioobra.service";
import { badRequest, success } from "../../../helpers";

export class CreateDiarioObraController implements Controller{
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {       const { body } = httpRequest;

        const createDiarioObraService = new CreateDiarioObraService();
        const diarioobraFinalizado = await createDiarioObraService.create(body);
            return success({
        data: diarioobraFinalizado,
        message: " Diário de obra cadastrada com sucesso",
      });
        } catch (error) {
             if (error instanceof Error) {
        return badRequest(error.message);
      }
      return badRequest("Erro inesperado ao processar resposta interna");
                
        }
    }
}