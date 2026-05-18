import { Controller, HttpRequest, HttpResponse } from "../../../protocol/http.protocol";
import { badRequest, success } from "../../../helpers";
import MaterialRepository from "../../../models/material.model";

export class FindMateriaisController implements Controller{
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const {id } = httpRequest.params;

      const materiais = await MaterialRepository.findOne({
        where: {
          id,
          isDeleted: false,
        }
      });

      if(!materiais) return badRequest("Materiais não encontrados");

      return success({
        data: materiais,
      })
    } catch (error) {
      if(error instanceof Error){
        return badRequest(error.message)
      }
      return badRequest("Erro inesperado ao processar resposta interna")
    }
  }
}
