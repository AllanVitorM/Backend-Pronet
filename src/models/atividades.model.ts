import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  DataTypes,
  CreationOptional,
} from "sequelize";
import { SequelizeHelper } from "./sequelize-helper";

class AtividadesRepository extends Model<InferAttributes<AtividadesRepository>, InferCreationAttributes<AtividadesRepository>> {
  declare id: CreationOptional<number>;
  declare idProjetos: number;
  declare idAtividadeDependencias: number;
  declare idMarco: number;
  declare nome: string;
  declare data_inicio_planejada: Date;
  declare data_fim_planejada: Date;
  declare progresso: number;
  declare status: string;
  declare data_inicio_real: Date | null;
  declare data_fim_real: Date | null;
  declare isDeleted: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

AtividadesRepository.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  idProjetos: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idAtividadeDependencias: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idMarco: {
    type: DataTypes.INTEGER,
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
  progresso: {
    type: DataTypes.DECIMAL(5,2),
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 100,
    }
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data_inicio_real: {
    type: DataTypes.DATE,
    allowNull: true
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
  }
}, {
  sequelize: SequelizeHelper.sequelize,
  tableName: "Atividades",
})