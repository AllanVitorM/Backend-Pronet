import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  DataTypes,
  CreationOptional,
} from "sequelize";
import { SequelizeHelper } from "./sequelize-helper";

class ProjetoRepository extends Model<
  InferAttributes<ProjetoRepository>,
  InferCreationAttributes<ProjetoRepository>
> {
  declare id: CreationOptional<number>;
  declare nome: string;
  declare data_inicio_planejada: Date;
  declare data_fim_planejada: Date;
  declare status: string;
  declare numero_pedido: string;
  declare ART: string;
  declare data_inicio_real: Date | null;
  declare data_fim_real: Date | null;
  declare isDeleted: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

ProjetoRepository.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data_inicio_planejada: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    data_fim_planejada: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numero_pedido: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    ART: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data_inicio_real: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    data_fim_real: {
      type: DataTypes.DATE,
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
    tableName: "Projetos",
  },
);

export default ProjetoRepository;
