import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  DataTypes,
  CreationOptional,
} from "sequelize";
import { SequelizeHelper } from "./sequelize-helper";

class PerfisPlanejadoRepository extends Model<
  InferAttributes<PerfisPlanejadoRepository>,
  InferCreationAttributes<PerfisPlanejadoRepository>
> {
  declare idAtividade: number;
  declare idPerfilColaborador: number;
  declare hh_planejada: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

PerfisPlanejadoRepository.init(
  {
    idAtividade: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    idPerfilColaborador: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    hh_planejada: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
    },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
  },
  {
    sequelize: SequelizeHelper.sequelize,
    tableName: "PerfisPlanejado",
  },
);

export default PerfisPlanejadoRepository;