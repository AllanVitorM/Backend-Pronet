import ProjetoRepository from "../models/projetos.model";

interface CreateProjetoDTO {
  nome: string;
  data_inicio_planejada: string;
  data_fim_planejada: string;
  status: string;
  numero_pedido: string;
  ART: string;
  data_inicio_real: string;
  data_fim_real: string;
}

export class CreateProjetoService {
  async create(data: CreateProjetoDTO) {
    if (!data.nome) {
      throw new Error("É necessário adicionar o nome do projeto");
    }

    if (!data.data_inicio_planejada) {
      throw new Error("É necessário adicionar uma data para início do projeto");
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
      throw new Error("É necessário adicionar a ART do engenheiro responsável");
    }

    if (data.ART.length !== 13) {
      throw new Error("É necessário 13 números para a ART ser válida.");
    }

    const projetoFinalizado = await ProjetoRepository.create({
      ...data,
      data_inicio_planejada: dataInicioPlanejada,
      data_fim_planejada: dataFimPlanejada,
      data_inicio_real: dataInicioReal,
      data_fim_real: dataFimReal,
    });

    return projetoFinalizado;
  }
}
