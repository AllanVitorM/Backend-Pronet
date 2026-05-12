import ContratoRepository from "../models/contrato.model";

interface CreateContratoDTO {
  escopo_contratual: string;
  valor_total: number;
  data_inicio: string;
  data_fim: string;
  status_contratual: string;
}

export class CreateContratoService {
  async create(data: CreateContratoDTO) {
    if (!data.escopo_contratual) {
      throw new Error("É preciso adicionar um escopo contratual");
    }
    if (!data.valor_total) {
      throw new Error("É necessário adicionar o valor total do contrato");
    }
    if (!data.data_inicio) {
      throw new Error("É necessário de uma data início do contrato");
    }
    if (!data.data_fim) {
      throw new Error("É necessário de uma data fim para o contrato");
    }

    const dataInicio = new Date(data.data_inicio);
    const dataFim = new Date(data.data_fim);

    if (isNaN(dataInicio.getTime())) {
      throw new Error("A data de início é inválida");
    }

    if (isNaN(dataFim.getTime())) {
      throw new Error("A data final é inválida");
    }

    if (dataFim <= dataInicio) {
      throw new Error(
        "Não é permitido a data final menor que a data inicial. Adicione um prazo maior",
      );
    }

    const contratoFinalizado = await ContratoRepository.create({
      ...data,
      data_inicio: dataInicio,
      data_fim: dataFim,
    });

    return contratoFinalizado;
  }
}
