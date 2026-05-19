import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  DataTypes,
  CreationOptional,
} from "sequelize";
import { SequelizeHelper } from "./sequelize-helper";
import Projeto from "./projetos.model"; // supondo que exista

class Atividade extends Model<
  InferAttributes<Atividade>,
  InferCreationAttributes<Atividade>
> {
  declare id: CreationOptional<number>;
  declare idProjeto: number;
  declare nome: string;
  declare descricao: string;
  declare status: string;
  declare data_inicio: Date;
  declare data_fim: Date;
  declare isDeleted: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // alias para o projeto relacionado
  declare readonly projeto?: Projeto;
}

Atividade.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    idProjeto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(45),
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
    tableName: "Atividade",
  }
);

// Relacionamentos
Atividade.belongsTo(Projeto, {
  foreignKey: "idProjeto",
  as: "projeto",
});

export default Atividade;