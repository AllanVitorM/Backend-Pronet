import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  DataTypes,
  CreationOptional,
} from "sequelize";
import { SequelizeHelper } from "./sequelize-helper";

class PerfisResponsaveisRepository extends Model<
  InferAttributes<PerfisResponsaveisRepository>,
  InferCreationAttributes<PerfisResponsaveisRepository>
> {
  declare idPerfilResponsavel: CreationOptional<number>;
  declare gerente: number | null;
  declare supervisor: number | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

PerfisResponsaveisRepository.init(
  {
    idPerfilResponsavel: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    gerente: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    supervisor: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
  },
  {
    sequelize: SequelizeHelper.sequelize,
    tableName: "PerfisResponsaveis",
  },
);

export default PerfisResponsaveisRepository;