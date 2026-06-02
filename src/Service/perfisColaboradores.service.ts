import PerfisColaboradoresRepository from "../models/PerfisColaboradores"
import SindicatoRepository from "../models/sindicato";

interface CreatePerfisColaboradoresDTO{
  idSindicato: number;
  nome_cargo: string;
  descricao: string;
}

export class CreatePerfisColaboradoresService{
  async create(data: CreatePerfisColaboradoresDTO){
    try {
      if(!data.idSindicato) {
        throw new Error("É obrigatório adicionar o sindicato ao perfil colaborador")
      }

      const sindicato = await SindicatoRepository.findOne({
        where: {
          id: data.idSindicato,
          isDeleted: false,
        }
      });

      if(!sindicato) {
        throw new Error("Esse sindicato não existe")
      }

      if(!data.nome_cargo) {
        throw new Error("É obrigatório adicionar o nome do cargo")
      }

      const perfisColaboradores = await PerfisColaboradoresRepository.create({
        idSindicato: data.idSindicato,
        nome_cargo: data.nome_cargo,
        descricao: data.descricao,
      })

      return perfisColaboradores;
    } catch (error) {
      throw error;
    }
  }
}
