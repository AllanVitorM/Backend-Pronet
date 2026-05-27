import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  DataTypes,
  CreationOptional,
} from "sequelize";

import { SequelizeHelper } from "./sequelize-helper";

class MarcoRepository extends Model<
  InferAttributes<MarcoRepository>,
  InferCreationAttributes<MarcoRepository>
> {
  declare id: CreationOptional<number>;
  declare data_prevista: Date;
  declare data_real: Date;
  declare descricao: string;
  declare isDeleted: CreationOptional<Boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

MarcoRepository.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    data_prevista: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    data_real: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING(),
      allowNull: true,
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
  { sequelize: SequelizeHelper.sequelize, tableName: "Marcos" },
);

export { MarcoRepository };
