import AtividadesRepository from "../models/atividades.model";

interface CreateAtividadesDTO {
  idProjetos: number;
  idAtividadeDependencias: number;
  idMarco: number;
  nome: string;
  data_inicio_planejada: string;
  data_fim_planejada: string;
  progresso: number;
  status: string;
}

export class CreateAtividadesService {
  async create(data: CreateAtividadesDTO) {
    if (!data.idProjetos) {
      throw new Error("Nenhum projeto vinculado a esta atividade");
    }
    if (!data.idAtividadeDependencias) {
      throw new Error(
        "Nenhuma dependência de atividades vinculada a esta atividade",
      );
    }
    if (!data.idMarco) {
      throw new Error("Nenhum marco vinculado a esta atividade");
    }
    if (!data.nome) {
      throw new Error("É necessário um nome para esta atividade");
    }

    const dataInicio = new Date(data.data_inicio_planejada);
    const dataFim = new Date(data.data_fim_planejada);

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

    const atividadeFinalizado = await AtividadesRepository.create({
      ...data,
      data_inicio_planejada: dataInicio,
      data_fim_planejada: dataFim,
    });

    return atividadeFinalizado;
  }
}
