import {
  HttpRequest,
  HttpResponse,
  Controller,
} from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import MateriaisUtilizadosRepository from "../../../models/materiaisUtilizados.model";
import ProjetoRepository from "../../../models/projetos.model";
import AtividadesRepository from "../../../models/atividades.model";
import MaterialRepository from "../../../models/material.model";

export class FindMateriaisUtilizados implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;

      const materiaisUtilizados = await MateriaisUtilizadosRepository.findOne({
        where: {
          id,
          isDeleted: false,
        },
        include: [
          {
            model: ProjetoRepository,
            as: "projeto",
          },
          {
            model: AtividadesRepository,
            as: "atividade",
          },
          {
            model: MaterialRepository,
            as: "material",
          },
        ],
      });
      if (!materiaisUtilizados) {
        return badRequest("Material utilizado não encontrado");
      }
      return success({
        data: materiaisUtilizados,
      });
    } catch (error) {
      if (error instanceof Error) {
        return badRequest(error.message);
      }
      return badRequest("Erro inesperado ao processar resposta interna");
    }
  }
}
