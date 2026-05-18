import ContratoRepository from "../models/contrato.model";
import ProjetoRepository from "../models/projetos.model";
import ProjetosContratosRepository from "../models/ProjetosContratos";
import { SequelizeHelper } from "../models/sequelize-helper";

interface CreateProjetoDTO {
  nome: string;
  data_inicio_planejada: string;
  data_fim_planejada: string;
  status: string;
  numero_pedido: string;
  ART: string;
  data_inicio_real?: string;
  data_fim_real?: string;
  contratos?: number[];
}

export class CreateProjetoService {
  async create(data: CreateProjetoDTO) {
    const transaction = await SequelizeHelper.sequelize.transaction();
    try {
      if (!data.nome) {
        throw new Error("É necessário adicionar o nome do projeto");
      }

      if (!data.data_inicio_planejada) {
        throw new Error(
          "É necessário adicionar uma data para início do projeto",
        );
      }
      if (!data.data_fim_planejada) {
        throw new Error(
          "É necessário adicionar uma data para finalizar o projeto",
        );
      }

      const dataInicioPlanejada = new Date(data.data_inicio_planejada);
      const dataFimPlanejada = new Date(data.data_fim_planejada);
      const dataInicioReal = data.data_inicio_real
        ? new Date(data.data_inicio_real)
        : null;
      const dataFimReal = data.data_fim_real
        ? new Date(data.data_fim_real)
        : null;

      if (isNaN(dataInicioPlanejada.getTime())) {
        throw new Error("Data adicionada está inválida");
      }

      if (isNaN(dataFimPlanejada.getTime())) {
        throw new Error("Data adicionada está inválida");
      }

      if (dataInicioReal && isNaN(dataInicioReal.getTime())) {
        throw new Error("Data adicionada está inválida");
      }

      if (dataFimReal && isNaN(dataFimReal.getTime())) {
        throw new Error("Data adicionada está inválida");
      }

      if (!data.status) {
        throw new Error("O projeto precisa de um status obrigatório");
      }

      if (!data.numero_pedido) {
        throw new Error("É necessário adicionar o número do pedido");
      }

      if (!data.ART) {
        throw new Error(
          "É necessário adicionar a ART do engenheiro responsável",
        );
      }

      if (data.ART.length !== 13) {
        throw new Error("É necessário 13 números para a ART ser válida.");
      }

      const { contratos, ...dadosProjeto } = data;

      if (contratos && !Array.isArray(contratos)) {
        throw new Error("Contratos precisam ser em listas de IDs.");
      }

      const contratosUnicos = contratos ? [...new Set(contratos)] : [];

      const projetoFinalizado = await ProjetoRepository.create(
        {
          ...dadosProjeto,
          data_inicio_planejada: dataInicioPlanejada,
          data_fim_planejada: dataFimPlanejada,
          data_inicio_real: dataInicioReal,
          data_fim_real: dataFimReal,
        },
        { transaction },
      );

      if (contratosUnicos.length > 0) {
        const contratosEncontrados = await ContratoRepository.findAll({
          where: {
            id: contratos,
            isDeleted: false,
          },
          transaction,
        });
        if (contratosEncontrados.length !== contratosUnicos.length) {
          throw new Error("Um ou mais contratos informados não existem");
        }

        await ProjetosContratosRepository.bulkCreate(
          contratosUnicos.map((idContrato) => ({
            idProjeto: projetoFinalizado.id,
            idContrato,
          })),
          { transaction },
        );
      }

      await transaction.commit();

      return projetoFinalizado;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
