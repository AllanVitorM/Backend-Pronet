import DiarioObraRepository from "../models/diarioobra.models";
import DiariosObraAtividadeRepository from "../models/diariosObraAtividades.model";
import AtividadesRepository from "../models/atividades.model";
import ResponsaveisRepository from "../models/responsaveis.model";
import { SequelizeHelper } from "../models/sequelize-helper";

interface atividadeDiarioObraDTO {
  idDiarioObra: number;
  idAtividade: number;
  idResponsavel: number;
}

export class DiariosObraAtividadeService {
  async create(data: atividadeDiarioObraDTO) {
    const transaction = await SequelizeHelper.sequelize.transaction();
    try {
      if (!data.idDiarioObra) {
        throw new Error("É necessário informar o diário de obra");
      }

      if (!data.idAtividade) {
        throw new Error("É necessário informar a atividade");
      }
      if (!data.idResponsavel) {
        throw new Error("É necessário informar o responsável");
      }

      const diarioObra = await DiarioObraRepository.findOne({
        where: {
          id: data.idDiarioObra,
          isDeleted: false,
        },
        transaction,
      });

      if (!diarioObra) {
        throw new Error("Diário de obra informado não existe");
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

      const responsavel = await ResponsaveisRepository.findOne({
        where: {
          id: data.idResponsavel,
          isDeleted: false,
        },
        transaction,
      });

      const vinculo = await DiariosObraAtividadeRepository.findOne({
        where: {
          idDiarioObra: data.idDiarioObra,
          idAtividade: data.idAtividade,
          isDeleted: false,
        },
        transaction,
      });
      if (vinculo) {
        throw new Error(
          "Essa atividade já está vinculada a este diário de obra",
        );
      }

      const registro = await DiariosObraAtividadeRepository.create(
        {
          idDiarioObra: data.idDiarioObra,
          idAtividade: data.idAtividade,
          idProjeto: atividade.idProjeto,
          idResponsavel: data.idResponsavel,
        },
        {
          transaction,
        },
      );

      await transaction.commit();
      return registro;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
