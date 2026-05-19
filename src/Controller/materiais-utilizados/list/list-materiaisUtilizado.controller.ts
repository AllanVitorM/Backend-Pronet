import {
  HttpRequest,
  HttpResponse,
  Controller,
} from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import MateriaisUtilizadosRepository from "../../../models/materiaisUtilizados.model";
import AtividadesRepository from "../../../models/atividades.model";
import ProjetoRepository from "../../../models/projetos.model";
import MaterialRepository from "../../../models/material.model";

export class ListMaterialUtilizadoController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { limit = 10, page = 1 } = httpRequest.query || {};
      const offset = (Number(page) - 1) * Number(limit);
      const { logged } = httpRequest;
      const {idAtividade} = httpRequest.params;

      if (!logged) {
        return badRequest("Usuário não autenticado");
      }

      const where: any ={
        isDeleted: false
      }

      if(!idAtividade) {
        where.idAtividade = Number(idAtividade);
      }

      const materialUtilizado =
        await MateriaisUtilizadosRepository.findAndCountAll({
          distinct: true,
          offset: offset,
          where: {
            isDeleted: false,
          },
          include: [
            {
              model: AtividadesRepository,
              as: "atividade",
            },
            {
              model: ProjetoRepository,
              as: "projeto",
            },
            {
              model: MaterialRepository,
              as: "material",
            },
          ],
          order: [["createdAt", '']]
        });

        if(!materialUtilizado) {
          return badRequest("Não foi encontrado nenhum material utilizado neste projeto.")
        }
        return success({
          data: materialUtilizado
        })
    } catch (error) {
       if (error instanceof Error) {
        return badRequest(error.message);
      }
      return badRequest("Erro inesperado ao processar resposta interna");
    }
  }
}
