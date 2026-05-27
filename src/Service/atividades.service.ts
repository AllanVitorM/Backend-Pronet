import AtividadesDependenciaRepository from "../models/atividades-dependencia.model";
import AtividadesRepository from "../models/atividades.model";

interface CreateAtividadesDTO {
  idProjeto: number;
  idMarco: number;
  nome: string;
  data_inicio_planejada: string;
  data_fim_planejada: string;
  progresso: number;
  status: string;
  dependencias?: number[];
}

export class CreateAtividadesService {
  async create(data: CreateAtividadesDTO) {
    if (!data.idProjeto) {
      throw new Error("Nenhum projeto vinculado a esta atividade");
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

    if (data.dependencias && !Array.isArray(data.dependencias)) {
      throw new Error("Dependência deve ser uma lista de IDs");
    }

    const dependenciasUnicas = data.dependencias
      ? [...new Set(data.dependencias)]
      : [];

    if (dependenciasUnicas.length > 0) {
      const atividadesDependencias = await AtividadesRepository.findAll({
        where: {
          id: dependenciasUnicas,
          idProjeto: data.idProjeto,
          isDeleted: false,
        },
      });
      if (atividadesDependencias.length !== dependenciasUnicas.length) {
        throw new Error(
          "Uma ou mais atividades de dependência não existem ou não pertencem ao mesmo projeto",
        );
      }
    }

    const atividadeFinalizado = await AtividadesRepository.create({
      ...data,
      data_inicio_planejada: dataInicio,
      data_fim_planejada: dataFim,
    });

    if (dependenciasUnicas.length > 0) {
      await AtividadesDependenciaRepository.bulkCreate(
        dependenciasUnicas.map((idAtividadesDependencias) => ({
          idAtividade: atividadeFinalizado.id,
          idAtividadeDependencias: idAtividadesDependencias,
        })),
      );
    }

    return atividadeFinalizado;
  }
}
