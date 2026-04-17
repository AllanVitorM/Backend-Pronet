import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  DataTypes,
  CreationOptional,
} from "sequelize";
import { SequelizeHelper } from "./sequelize-helper";

class ContratoRepository extends Model<
  InferAttributes<ContratoRepository>,
  InferCreationAttributes<ContratoRepository>
> {
  declare id: CreationOptional<number>;
  declare cliente: string;
  declare descricaoContrato: string;
  declare tipoContrato: string;
  declare dataInicio: Date;
  declare dataFinal: Date;
  declare valorTotal: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

ContratoRepository.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    cliente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricaoContrato: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipoContrato: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dataInicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dataFinal: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    valorTotal: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
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
    tableName: "Contrato",
  },
);

export default ContratoRepository;
