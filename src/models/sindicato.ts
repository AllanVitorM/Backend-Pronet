import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  DataTypes,
  CreationOptional,
} from "sequelize";
import { SequelizeHelper } from "./sequelize-helper";

class SindicatoRepository extends Model<
  InferAttributes<SindicatoRepository>,
  InferCreationAttributes<SindicatoRepository>
> {
  declare id: CreationOptional<number>;
  declare nome: string;
  declare isDeleted: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

SindicatoRepository.init(
  {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
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
    tableName: "Sindicato",
  },
);

export default SindicatoRepository;
