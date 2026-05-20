import DiarioObraRepository from "../models/diarioobra.models";

interface CreateDiarioObraDTO {
    data_registro: string;
    percentual_atividade: number;
    descricao: string;
}

export class CreateDiarioObraService {
    async create(data: CreateDiarioObraDTO) {
        const data_Registro = new Date(data.data_registro);
        if (!data_Registro) {
            throw new Error("Data inválida");
        }
        
        if (!data.percentual_atividade) {
            throw new Error("Percentual inválido");
        }
        
        if (!data.descricao) {
            throw new Error ("Descrição inválida");
            
        }
        const diarioobraFinalizado = await DiarioObraRepository.create({
            ...data,
            data_registro: data_Registro,

        });

        return diarioobraFinalizado;

    }
}