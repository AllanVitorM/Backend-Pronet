import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  DataTypes,
  CreationOptional,
} from "sequelize";
import { SequelizeHelper } from "./sequelize-helper";
import ClienteRepository from "./cliente.model";

class ContratoRepository extends Model<
  InferAttributes<ContratoRepository>,
  InferCreationAttributes<ContratoRepository>
> {
  declare id: CreationOptional<number>;
  declare idCliente: number;
  declare escopo_contratual: string;
  declare valor_total: number;
  declare data_inicio: Date;
  declare data_fim: Date;
  declare status_contratual: string;
  declare isDeleted: CreationOptional<boolean>;
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
    idCliente: {
      type: DataTypes.BIGINT,
      allowNull: false, 
    },
    escopo_contratual: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
    valor_total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    data_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    data_fim: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status_contratual: {
      type: DataTypes.STRING,
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
  {
    sequelize: SequelizeHelper.sequelize,
    tableName: "Contrato",
  },
);

ClienteRepository.hasMany(ContratoRepository, {
  foreignKey: "idCliente",
  as: "contratos",
});

ContratoRepository.belongsTo(ClienteRepository, {
  foreignKey: "idCliente",
  as: "cliente",
})

export default ContratoRepository;
