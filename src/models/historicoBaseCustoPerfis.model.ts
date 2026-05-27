import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  DataTypes,
  CreationOptional,
} from "sequelize";

import { SequelizeHelper } from "./sequelize-helper";
import PerfisColaboradoresRepository from "./PerfisColaboradores";

class HistoricosBaseCustoPerfilRepository extends Model<
  InferAttributes<HistoricosBaseCustoPerfilRepository>,
  InferCreationAttributes<HistoricosBaseCustoPerfilRepository>
> {
  declare id: CreationOptional<number>;
  declare idPerfilColaborador: number;
  declare date_inicio_vigencia: Date;
  declare data_fim_vigencia: Date;
  declare base_salarial: number;
  declare base_beneficios: number;
  declare fm_adicional_noturno: number;
  declare fm_adicional_periculosidade: number;
  declare fm_adicional_insalubridade: number;
  declare CH_mensal: number;
  declare isDeleted: CreationOptional<Boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

HistoricosBaseCustoPerfilRepository.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    idPerfilColaborador: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date_inicio_vigencia: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    data_fim_vigencia: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    base_salarial: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    base_beneficios: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    fm_adicional_noturno: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    fm_adicional_periculosidade: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    fm_adicional_insalubridade: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    CH_mensal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: SequelizeHelper.sequelize,
    tableName: "HistoricosBaseCustoPerfil",
  },
);

PerfisColaboradoresRepository.hasMany(HistoricosBaseCustoPerfilRepository, {
  foreignKey: "idPerfilColaborador",
  as: "historicoBaseCustoPerfil",
});

HistoricosBaseCustoPerfilRepository.belongsTo(PerfisColaboradoresRepository, {
  foreignKey: "idPerfilColaborador",
  as: "historico",
});
