import PerfisResponsaveisRepository from "../models/perfisResponsaveis.model";

interface CreatePerfisResponsaveisRepositoryDTO {
  nome: string;
  descricao: string;
}

export class CreatePerfisResponsaveisService {
  async create(data: CreatePerfisResponsaveisRepositoryDTO) {
    try {
      if (!data.nome) {
        throw new Error("É obrigatório ter o nome do cargo responsável");
      }

      const perfisResponsaveis = await PerfisResponsaveisRepository.create({
        nome: data.nome,
        descricao: data.descricao,
      });

      return perfisResponsaveis;
    } catch (error) {
      throw error;
    }
  }
}
