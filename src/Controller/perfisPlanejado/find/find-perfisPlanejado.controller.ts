import {
  HttpRequest,
  HttpResponse,
  Controller,
} from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import PerfisPlanejadoRepository from "../../../models/perfisPlanejado.model";
import PerfisColaboradoresRepository from "../../../models/PerfisColaboradores";
import AtividadesRepository from "../../../models/atividades.model";

export class FindPerfisPlanejadoController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;

      const perfisPlanejados = await PerfisPlanejadoRepository.findOne({
        where: {
          id: id,
          isDeleted: false,
        },
        include: [
          {
            model: AtividadesRepository,
            as: "atividade",
          },
          {
            model: PerfisColaboradoresRepository,
            as: "perfisColaborador",
          },
        ],
      });

      if(!perfisPlanejados) {
        return badRequest("Perfil planejado não encontrado")
      }

      return success({
        data: perfisPlanejados
      })
    } catch (error) {
      if (error instanceof Error) {
        return badRequest(error.message);
      }
      return badRequest("Erro inesperado ao processar resposta interna");
    }
  }
}
