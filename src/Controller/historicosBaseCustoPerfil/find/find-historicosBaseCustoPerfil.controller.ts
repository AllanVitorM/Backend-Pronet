import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import HistoricosBaseCustoPerfilRepository from "../../../models/historicoBaseCustoPerfis.model";
import PerfisColaboradoresRepository from "../../../models/PerfisColaboradores";

export class FindHistoricoBaseCustoPerfilController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;

      if (!id) {
        return badRequest("É necessário informar o histórico");
      }

      const idNumber = Number(id);

      if (isNaN(idNumber)) {
        return badRequest("O id informado é inválido");
      }

      const historico = await HistoricosBaseCustoPerfilRepository.findOne({
        where: {
          id: idNumber,
          isDeleted: false,
        },
        include: [
          {
            model: PerfisColaboradoresRepository,
            as: "perfilColaborador",
          },
        ],
      });

      if (!historico) {
        return badRequest(
          "Histórico de base de custo do perfil não encontrado",
        );
      }

      return success({
        data: historico,
      });
    } catch (error) {
      if (error instanceof Error) {
        return badRequest(error.message);
      }

      return badRequest("Erro inesperado ao processar resposta interna");
    }
  }
}
