import AtividadesRepository from "../models/atividades.model";
import MateriaisPlanejadoRepository from "../models/materiaisPlanejado.model";
import MateriaisUtilizadosRepository from "../models/materiaisUtilizados.model";
import PerfisPlanejadoRepository from "../models/perfisPlanejado.model";
import ColaboradoresUtilizadosRepository from "../models/colaboradoresUtilizados.model";
import MaterialRepository from "../models/material.model";
import ColaboradoresRepository from "../models/colaboradores";
import PerfisColaboradoresRepository from "../models/PerfisColaboradores";
import HistoricosBaseCustoPerfilRepository from "../models/historicoBaseCustoPerfis.model";

function calcularCustoHoraHistorico(historico: any): number {
  if (!historico) return 0;

  const baseSalarial = Number(historico.base_salarial ?? 0);
  const baseBeneficios = Number(historico.base_beneficios ?? 0);
  const adicionalNoturno = Number(historico.fm_adicional_noturno ?? 0);
  const adicionalPericulosidade = Number(
    historico.fm_adicional_periculosidade ?? 0,
  );
  const adicionalInsalubridade = Number(
    historico.fm_adicional_insalubridade ?? 0,
  );
  const cargaHorariaMensal = Number(historico.CH_mensal ?? 0);

  if (cargaHorariaMensal <= 0) {
    return 0;
  }

  const custoMensal =
    baseSalarial +
    baseBeneficios +
    adicionalNoturno +
    adicionalPericulosidade +
    adicionalInsalubridade;

  return custoMensal / cargaHorariaMensal;
}

function buscarHistoricoVigente(historicos: any[], dataReferencia?: Date) {
  if (!historicos || historicos.length === 0) {
    return null;
  }

  const referencia = dataReferencia ?? new Date();

  const historicoVigente = historicos.find((historico) => {
    const inicio = new Date(historico.date_inicio_vigencia);
    const fim = new Date(historico.data_fim_vigencia);

    return inicio <= referencia && fim >= referencia;
  });

  return historicoVigente ?? historicos[0];
}

export class CustosAtividadeService {
  async calcular(idAtividade: number) {
    if (!idAtividade || isNaN(idAtividade)) {
      throw new Error("Atividade inválida");
    }

    const atividade = await AtividadesRepository.findOne({
      where: {
        id: idAtividade,
        isDeleted: false,
      },
      attributes: [
        "id",
        "idProjeto",
        "nome",
        "data_inicio_planejada",
        "data_fim_planejada",
      ],
    });

    if (!atividade) {
      throw new Error("Atividade não encontrada");
    }

    const materiaisPlanejados = await MateriaisPlanejadoRepository.findAll({
      where: {
        idAtividade,
        isDeleted: false,
      },
      include: [
        {
          model: MaterialRepository,
          as: "material",
        },
      ],
    });

    const materiaisUtilizados = await MateriaisUtilizadosRepository.findAll({
      where: {
        idAtividade,
        isDeleted: false,
      },
      include: [
        {
          model: MaterialRepository,
          as: "material",
        },
      ],
    });

    const perfisPlanejados = await PerfisPlanejadoRepository.findAll({
      where: {
        idAtividade,
        isDeleted: false,
      },
      include: [
        {
          model: PerfisColaboradoresRepository,
          as: "perfisColaborador",
          include: [
            {
              model: HistoricosBaseCustoPerfilRepository,
              as: "historicoBaseCustoPerfil",
              where: {
                isDeleted: false,
              },
              required: false,
            },
          ],
        },
      ],
    });

    const colaboradoresUtilizados =
      await ColaboradoresUtilizadosRepository.findAll({
        where: {
          idAtividade,
          isDeleted: false,
        },
        include: [
          {
            model: ColaboradoresRepository,
            as: "colaborador",
          },
        ],
      });

    let custoMaterialPlanejado = 0;
    let custoMaterialReal = 0;
    let custoMaoDeObraPlanejada = 0;
    let custoMaoDeObraReal = 0;

    for (const item of materiaisPlanejados as any[]) {
      const quantidadePlanejada = Number(item.quantidade_planejada ?? 0);

      const valorUnitarioCotado = Number(
        item.material?.valor_unitario_cotado ?? 0,
      );

      custoMaterialPlanejado += quantidadePlanejada * valorUnitarioCotado;
    }

    for (const item of materiaisUtilizados as any[]) {
      const quantidadeReal = Number(item.quantidade_real ?? 0);

      const valorUnitarioAdquirido = Number(
        item.material?.valor_unitario_adquirido ?? 0,
      );

      custoMaterialReal += quantidadeReal * valorUnitarioAdquirido;
    }

    for (const item of perfisPlanejados as any[]) {
      const hhPlanejada = Number(item.hh_planejada ?? 0);

      const dataReferencia = atividade.data_inicio_planejada
        ? new Date(atividade.data_inicio_planejada)
        : new Date();

      const historico = buscarHistoricoVigente(
        item.perfisColaborador?.historicoBaseCustoPerfil ?? [],
        dataReferencia,
      );

      const custoHoraPerfil = calcularCustoHoraHistorico(historico);

      custoMaoDeObraPlanejada += hhPlanejada * custoHoraPerfil;
    }

    for (const item of colaboradoresUtilizados as any[]) {
      const hhReal = Number(item.hh_real ?? 0);
      const baseSalarial = Number(item.colaborador?.base_salarial ?? 0);

      const custoHoraColaborador = baseSalarial / 220;

      custoMaoDeObraReal += hhReal * custoHoraColaborador;
    }

    const totalPlanejado = custoMaterialPlanejado + custoMaoDeObraPlanejada;
    const totalReal = custoMaterialReal + custoMaoDeObraReal;

    const desvioValor = totalReal - totalPlanejado;

    const desvioPercentual =
      totalPlanejado > 0 ? (desvioValor / totalPlanejado) * 100 : 0;

    return {
      idAtividade: atividade.id,
      idProjeto: atividade.idProjeto,
      nomeAtividade: atividade.nome,

      custoPlanejado: {
        materiais: Number(custoMaterialPlanejado.toFixed(2)),
        maoDeObra: Number(custoMaoDeObraPlanejada.toFixed(2)),
        total: Number(totalPlanejado.toFixed(2)),
      },

      custoReal: {
        materiais: Number(custoMaterialReal.toFixed(2)),
        maoDeObra: Number(custoMaoDeObraReal.toFixed(2)),
        total: Number(totalReal.toFixed(2)),
      },

      desvio: {
        valor: Number(desvioValor.toFixed(2)),
        percentual: Number(desvioPercentual.toFixed(2)),
      },
    };
  }
}
