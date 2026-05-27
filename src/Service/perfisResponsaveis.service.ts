import PerfisResponsaveisRepository from "../models/perfisResponsaveis.model";

interface CreatePerfisResponsaveisDTO {
  gerente?: number | null;
  supervisor?: number | null;
}

export class CreatePerfisResponsaveisService {
  async create(data: CreatePerfisResponsaveisDTO) {
    if (!data.gerente && !data.supervisor) {
      throw new Error("É necessário informar ao menos um gerente ou supervisor");
    }

    const perfilResponsavel = await PerfisResponsaveisRepository.create({
      gerente: data.gerente ?? null,
      supervisor: data.supervisor ?? null,
    });

    return perfilResponsavel;
  }
}