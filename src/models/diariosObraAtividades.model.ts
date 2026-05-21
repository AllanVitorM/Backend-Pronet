import {
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  Model,
  CreationOptional,
} from "sequelize";
import { SequelizeHelper } from "./sequelize-helper";

class DiariosObraAtividadeRepository extends Model<
  InferAttributes<DiariosObraAtividadeRepository>,
  InferCreationAttributes<DiariosObraAtividadeRepository>
> {
  declare id: CreationOptional<number>;
  declare idAtividade: number;
  declare idProjeto: number;
  declare idResponsavel: number;
  declare idDiarioObra: number;
  declare isDeleted: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

DiariosObraAtividadeRepository.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    idAtividade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idProjeto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idResponsavel: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idDiarioObra: {
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
    tableName: "DiariosObraAtividades",
  },
);
