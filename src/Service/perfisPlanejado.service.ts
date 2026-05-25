import PerfisPlanejadoRepository from "../models/perfisPlanejado.model";
import AtividadesRepository from "../models/atividades.model";
import PerfisColaboradoresRepository from "../models/PerfisColaboradores";
import { SequelizeHelper } from "../models/sequelize-helper";

interface CreatePerfisPlanejadoDTO {
  idAtividade: number;
  idPerfilColaborador: number;
  hh_planejada: number;
}

export class PerfisPlanejadoService {
  async create(data: CreatePerfisPlanejadoDTO) {
    const transaction = await SequelizeHelper.sequelize.transaction();
    try {
      if (!data.idAtividade) {
        throw new Error("É necessário informar a atividade");
      }
      if (!data.idPerfilColaborador) {
        throw new Error("É necessário informar o perfil do colaborador");
      }

      if (!data.hh_planejada) {
        throw new Error("É necessário informar a hora homem planejada");
      }

      if (
        data.hh_planejada === undefined ||
        data.hh_planejada === null ||
        Number(data.hh_planejada) <= 0
      ) {
        throw new Error("A quantidade planejada precisa ser maior do que zero");
      }

      const atividade = await AtividadesRepository.findOne({
        where: {
          id: data.idAtividade,
          isDeleted: false,
        },
        transaction,
      });

      if (!atividade) {
        throw new Error("Atividade informada não existe");
      }

      const perfilColaborador = await PerfisColaboradoresRepository.findOne({
        where: {
          id: data.idPerfilColaborador,
          isDeleted: false,
        },
        transaction,
      });

      if (!perfilColaborador) {
        throw new Error("Perfil do colaborador não existe");
      }

      const validacao = await PerfisPlanejadoRepository.findOne({
        where: {
          idAtividade: data.idAtividade,
          idPerfilColaborador: data.idPerfilColaborador,
          isDeleted: false,
        },
        transaction,
      });

      if (validacao) {
        throw new Error("Esse perfil já foi planejado para essa atividade");
      }

      const perfisPlanejado = await PerfisPlanejadoRepository.create(
        {
          idAtividade: data.idAtividade,
          idPerfilColaborador: data.idPerfilColaborador,
          hh_planejada: data.hh_planejada,
        },
        {
          transaction,
        },
      );
      await transaction.commit();
      return perfisPlanejado;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
