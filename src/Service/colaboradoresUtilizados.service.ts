import { badRequest } from "../helpers";
import AtividadesRepository from "../models/atividades.model";
import ColaboradoresRepository from "../models/colaboradores";
import ColaboradoresUtilizadosRepository from "../models/colaboradoresUtilizados.model";
import DiarioObraRepository from "../models/diarioobra.models";
import ProjetoRepository from "../models/projetos.model";
import ResponsaveisRepository from "../models/responsaveis.model";
import { SequelizeHelper } from "../models/sequelize-helper";

interface CreateColaboradoresUtilizadosDTO {
  idColaborador: number;
  idAtividade: number;
  idProjeto: number;
  idResponavel: number;
  idDiarioObra: number;
  hh_real: number;
}

export class CreateColaboradoresUtilizadosService {
  async create(data: CreateColaboradoresUtilizadosDTO) {
    const transaction = await SequelizeHelper.sequelize.transaction();
    try {
      const colaborador = await ColaboradoresRepository.findOne({
        where: {
          id: data.idColaborador,
          isDeleted: false,
        },
        transaction,
      });
      if (!colaborador) {
        throw new Error("Colaborador informado não existe");
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

      const projeto = await ProjetoRepository.findOne({
        where: {
          id: data.idProjeto,
          isDeleted: false,
        },
        transaction,
      });
      if (!projeto) {
        throw new Error("Projeto informado não existe");
      }

      const responsavel = await ResponsaveisRepository.findOne({
        where: {
          id: data.idResponavel,
          isDeleted: false,
        },
        transaction,
      });

      if (!responsavel) {
        throw new Error(
          "Responsável informado não está ligado(a) a este projeto/atividade",
        );
      }

      const diarioObra = await DiarioObraRepository.findOne({
        where: {
          id: data.idDiarioObra,
          isDeleted: false,
        },
        transaction,
      });
      if (!diarioObra) {
        throw new Error("Diário de obra não informado ou não existe");
      }

      if (!data.hh_real) {
        throw new Error(
          "É obrigatório adicionar a hora homem dos colaboradores",
        );
      }

      const colaboradoresUtilizados =
        await ColaboradoresUtilizadosRepository.create(
          {
            idColaborador: data.idColaborador,
            idAtividade: data.idAtividade,
            idProjeto: data.idProjeto,
            idResponsavel: data.idProjeto,
            idDiarioObra: data.idDiarioObra,
            hh_real: data.hh_real,
          },
          { transaction },
        );
      await transaction.commit();
      return colaboradoresUtilizados;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
