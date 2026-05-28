import { MarcoRepository } from "../models/marco.model";

interface CreateMarcoDTO {
  data_prevista: Date;
  data_real: Date;
  descricao: string;
}

export class MarcoService {
  async create(data: CreateMarcoDTO) {
    try {
      if (data.data_prevista) {
        throw new Error("É necessário uma data prevista para o marco");
      }

      if (data.data_real) {
        throw new Error("É necessário de uma data real para o marco");
      }

      const dataPrevista = new Date(data.data_prevista);
      const dataReal = new Date(data.data_real);

      if (isNaN(dataPrevista.getTime())) {
        throw new Error("A data prevista é inválida");
      }

      if (isNaN(dataReal.getTime())) {
        throw new Error("A data real é inválida");
      }

      const marcoFinalizado = await MarcoRepository.create({
        ...data,
        data_prevista: dataPrevista,
        data_real: dataReal,
      });

      return marcoFinalizado;
    } catch (error) {
      throw error;
    }
  }
}
