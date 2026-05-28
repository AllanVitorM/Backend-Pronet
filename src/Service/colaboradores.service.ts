import ColaboradoresRepository from "../models/colaboradores";
import PerfisColaboradoresRepository from "../models/PerfisColaboradores";
import { SequelizeHelper } from "../models/sequelize-helper";

interface CreateColaboradoresDTO {
  idPerfilColaborador: number;
  nome: string;
  email: string;
  base_salarial: number;
}

export class ColaboradoresService {
  async create(data: CreateColaboradoresDTO) {
    const transaction = await SequelizeHelper.sequelize.transaction();
    try {
      if (!data.idPerfilColaborador) {
        throw new Error("É necessário vincular um perfil ao colaborador");
      }

      const perfil = await PerfisColaboradoresRepository.findOne({
        where: {
          id: data.idPerfilColaborador,
          isDeleted: false,
        },
        transaction,
      });
      if (!perfil) {
        throw new Error("Não existe um perfil para este colaborador");
      }

      if (!data.nome) {
        throw new Error("É necessário adicionar um nome ao colaborador");
      }
      if (!data.email) {
        throw new Error("É necessário adicionar um email ao colaborador");
      }

      if (!data.base_salarial || Number(data.base_salarial) <= 0) {
        throw new Error(
          "É necessário adicionar uma base salarial maior que zero ao colaborador",
        );
      }

      const colaboradorExistente = await ColaboradoresRepository.findOne({
        where: {
          email: data.email,
          isDeleted: false,
        },
        transaction,
      });

      if (colaboradorExistente) {
        throw new Error("Já existe um colaborador cadastrado com este email");
      }

      const colaboradores = await ColaboradoresRepository.create(
        {
          idPerfilColaborador: data.idPerfilColaborador,
          nome: data.nome,
          email: data.email,
          base_salarial: data.base_salarial,
        },
        { transaction },
      );

      await transaction.commit();

      return colaboradores;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
