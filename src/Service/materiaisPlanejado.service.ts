import MateriaisPlanejadoRepository from "../models/materiaisPlanejado.model";
import MaterialRepository from "../models/material.model";
import AtividadesRepository from "../models/atividades.model";
import { SequelizeHelper } from "../models/sequelize-helper";

interface CreateMateriaisPlanejadoDTO {
  idMaterial: number;
  idAtividade: number;
  quantidade_planejada: number;
}

export class MateriaisPlanejadoService {
  async create(data: CreateMateriaisPlanejadoDTO) {
    const transaction = await SequelizeHelper.sequelize.transaction();
    try {
      if (!data.idMaterial) {
        throw new Error("É necessário informar o material");
      }
      if (!data.idAtividade) {
        throw new Error("É necessário informar a atividade");
      }
      if (!data.quantidade_planejada) {
        throw new Error("É necessário informar a quantidade planejada");
      }

      if (
        data.quantidade_planejada === undefined ||
        data.quantidade_planejada === null ||
        Number(data.quantidade_planejada) <= 0
      ) {
        throw new Error("A quantidade planejada precisa ser maior que zero");
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

      // const validacao = await MateriaisPlanejadoRepository.findOne({
      //   where: {
      //     idAtividade: data.idAtividade,
      //     idMaterial: data.idMaterial,
      //     isDeleted: false,
      //   },
      //   transaction,
      // });

      // if (validacao) {
      //   throw new Error("Este material já foi planejado para esta atividade");
      // }

      const materiaisPlanejado = await MateriaisPlanejadoRepository.create(
        {
          idAtividade: data.idAtividade,
          idMaterial: data.idMaterial,
          quantidade_planejada: data.quantidade_planejada,
          isDeleted: false,
        },
        {
          transaction,
        },
      );
      await transaction.commit();
      return materiaisPlanejado;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
