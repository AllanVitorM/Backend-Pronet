import MaterialRepository from "../models/material.model";

interface CreateMaterialDTO {
  nome_material: string;
  descricao?: string;
  codigo_produto?: string;
  valor_unitario_cotado?: number;
  valor_unitario_adquirido?: number;
  unidade_medida: string;
}

export class CreateMaterialService {
  async create(data: CreateMaterialDTO) {
    if (!data.nome_material) {
      throw new Error("É necessário adicionar o nome do material");
    }

    if (!data.unidade_medida) {
      throw new Error("É necessário adicionar a unidade de medida do material");
    }

    if (
      data.valor_unitario_cotado !== undefined &&
      data.valor_unitario_cotado < 0
    ) {
      throw new Error("O valor unitário cotado não pode ser negativo");
    }

    if (
      data.valor_unitario_adquirido !== undefined &&
      data.valor_unitario_adquirido < 0
    ) {
      throw new Error("O valor unitário adquirido não pode ser negativo");
    }

    const material = await MaterialRepository.create({
      nome_material: data.nome_material,
      descricao: data.descricao ?? null,
      codigo_produto: data.codigo_produto ?? null,
      valor_unitario_cotado: data.valor_unitario_cotado ?? null,
      valor_unitario_adquirido: data.valor_unitario_adquirido ?? null,
      unidade_medida: data.unidade_medida,
    });

    return material;
  }
}