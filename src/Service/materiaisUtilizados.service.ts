import MateriaisUtilizadosRepository from "../models/materiaisUtilizados.model";
import AtividadesRepository from "../models/atividades.model";
import MaterialRepository from "../models/material.model";
import { SequelizeHelper } from "../models/sequelize-helper";

interface CreateMateriaisUtilizadosDTO {
  idAtividade: number;
  idMaterial: number;
  quantidade_real: number;
}

export class CreateMateriaisUtilizadosService {
  async create(data: CreateMateriaisUtilizadosDTO) {
    const transaction = await SequelizeHelper.sequelize.transaction();
    try {
      if (!data.idMaterial) {
        throw new Error("É necessário informar o material utilizado");
      }

      if (!data.idAtividade) {
        throw new Error("É necessário informar a atividade");
      }

      if (!data.quantidade_real || Number(data.quantidade_real) <= 0) {
        throw new Error("A quantidade real precisa ser maior que zero");
      }

      const material = await MaterialRepository.findOne({
        where: {
          id: data.idMaterial,
          isDeleted: false,
        },
        transaction,
      });

      if (!material) {
        throw new Error("Material informado não existe");
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

      const materialUtilizado = await MateriaisUtilizadosRepository.create(
        {
          idMaterial: data.idMaterial,
          idAtividade: data.idAtividade,
          idProjeto: atividade.idProjeto,
          quantidade_real: data.quantidade_real,
        },
        { transaction },
      );
      await transaction.commit();
      return materialUtilizado;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
