import {
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  Model,
  CreationOptional,
} from "sequelize";
import { SequelizeHelper } from "./sequelize-helper";
import AtividadesRepository from "./atividades.model";
import PerfisColaboradoresRepository from "./PerfisColaboradores";

class PerfisPlanejadoRepository extends Model<
  InferAttributes<PerfisPlanejadoRepository>,
  InferCreationAttributes<PerfisPlanejadoRepository>
> {
  declare id: CreationOptional<number>;
  declare idAtividade: number;
  declare idPerfilColaborador: number;
  declare hh_planejada: number;
  declare isDeleted: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

PerfisPlanejadoRepository.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    idAtividade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idPerfilColaborador: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hh_planejada: {
      type: DataTypes.DECIMAL(8, 2),
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
    tableName: "PerfisPlanejado",
  },
);

AtividadesRepository.hasMany(PerfisPlanejadoRepository, {
  foreignKey: "idAtividade",
  as: "perfisPlanejado",
});

PerfisPlanejadoRepository.belongsTo(AtividadesRepository, {
  foreignKey: "idAtividade",
  as: "atividade",
});

PerfisColaboradoresRepository.hasMany(PerfisPlanejadoRepository, {
  foreignKey: "idPerfilColaborador",
  as: "perfisPlanejadoColaborador",
});

PerfisPlanejadoRepository.belongsTo(PerfisColaboradoresRepository, {
  foreignKey: "idPerfilColaborador",
  as: "perfisColaborador",
});

export default PerfisPlanejadoRepository;
