import PerfisPlanejadoRepository from "../models/perfisPlanejado.model";

interface CreatePerfisPlanejadoDTO {
  idAtividade: number;
  idPerfilColaborador: number;
  hh_planejada: number;
}

export class CreatePerfisPlanejadoService {
  async create(data: CreatePerfisPlanejadoDTO) {
    if (!data.idAtividade) {
      throw new Error("É necessário informar o idAtividade");
    }

    if (!data.idPerfilColaborador) {
      throw new Error("É necessário informar o idPerfilColaborador");
    }

    if (data.hh_planejada === undefined || data.hh_planejada === null) {
      throw new Error("É necessário informar as horas planejadas");
    }

    if (data.hh_planejada < 0) {
      throw new Error("As horas planejadas não podem ser negativas");
    }

    const perfilPlanejado = await PerfisPlanejadoRepository.create({
      idAtividade: data.idAtividade,
      idPerfilColaborador: data.idPerfilColaborador,
      hh_planejada: data.hh_planejada,
    });

    return perfilPlanejado;
  }
}