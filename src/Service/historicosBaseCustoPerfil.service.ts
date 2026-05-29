import HistoricosBaseCustoPerfilRepository from "../models/historicoBaseCustoPerfis.model";
import PerfisColaboradoresRepository from "../models/PerfisColaboradores";
import { SequelizeHelper } from "../models/sequelize-helper";

interface createHistoricosBaseCustoPerfilDTO {
  idPerfilColaborador: number;
  data_inicio_vingencia: string;
  data_fim_vingencia?: string | null;
  base_salarial: number;
  base_beneficios: number;
  fm_adicional_noturno: number;
  fm_adicional_periculosidade: number;
  fm_adicional_insalubridade: number;
  CH_mensal: number;
}

export class HistoricosBaseCustoPerfilService {
  async create(data: createHistoricosBaseCustoPerfilDTO) {
    const transaction = await SequelizeHelper.sequelize.transaction();

    try {
      if (!data.idPerfilColaborador) {
        throw new Error("É necessário vincular um perfil de colaborador");
      }

      const perfilColaborador = await PerfisColaboradoresRepository.findOne({
        where: {
          id: data.idPerfilColaborador,
          isDeleted: false,
        },
        transaction,
      });

      if (!perfilColaborador) {
        throw new Error("Perfil de colaborador informado não existe");
      }

      if (!data.data_inicio_vingencia) {
        throw new Error("É necessário informar a data de início da vigência");
      }

      if (!data.data_fim_vingencia) {
        throw new Error("É necessário informar a data final da vigência");
      }

      const dataInicioVigencia = new Date(data.data_inicio_vingencia);
      const dataFimVigencia = new Date(data.data_fim_vingencia);

      if (isNaN(dataInicioVigencia.getTime())) {
        throw new Error("A data de início da vigência é inválida");
      }

      if (isNaN(dataFimVigencia.getTime())) {
        throw new Error("A data final da vigência é inválida");
      }

      if (dataFimVigencia <= dataInicioVigencia) {
        throw new Error(
          "A data final da vigência precisa ser maior que a data inicial",
        );
      }

      if (!data.base_salarial || Number(data.base_salarial) <= 0) {
        throw new Error("A base salarial precisa ser maior que zero");
      }

      if (data.base_beneficios == null || Number(data.base_beneficios) < 0) {
        throw new Error("A base de benefícios não pode ser negativa");
      }

      if (
        data.fm_adicional_noturno == null ||
        Number(data.fm_adicional_noturno) < 0
      ) {
        throw new Error("O fator de adicional noturno não pode ser negativo");
      }

      if (
        data.fm_adicional_periculosidade == null ||
        Number(data.fm_adicional_periculosidade) < 0
      ) {
        throw new Error(
          "O fator de adicional de periculosidade não pode ser negativo",
        );
      }

      if (
        data.fm_adicional_insalubridade == null ||
        Number(data.fm_adicional_insalubridade) < 0
      ) {
        throw new Error(
          "O fator de adicional de insalubridade não pode ser negativo",
        );
      }

      if (!data.CH_mensal || Number(data.CH_mensal) <= 0) {
        throw new Error("A carga horária mensal precisa ser maior que zero");
      }

      const historico = await HistoricosBaseCustoPerfilRepository.create(
        {
          idPerfilColaborador: data.idPerfilColaborador,
          data_inicio_vigencia: dataInicioVigencia,
          data_fim_vigencia: dataFimVigencia,
          base_salarial: data.base_salarial,
          base_beneficios: data.base_beneficios,
          fm_adicional_noturno: data.fm_adicional_noturno,
          fm_adicional_periculosidade: data.fm_adicional_periculosidade,
          fm_adicional_insalubridade: data.fm_adicional_insalubridade,
          CH_mensal: data.CH_mensal,
        },
        { transaction },
      );

      await transaction.commit();

      return historico;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
