import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  DataTypes,
  CreationOptional,
} from "sequelize";
import { SequelizeHelper } from "./sequelize-helper";
import Atividade from "./atividade.model";

class AtividadesDependencia extends Model<
  InferAttributes<AtividadesDependencia>,
  InferCreationAttributes<AtividadesDependencia>
> {
  declare id: CreationOptional<number>;
  declare idAtividade: number;
  declare idAtividadeDependencia: number;
  declare isDeleted: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare readonly atividade?: Atividade;
  declare readonly atividadeDependencia?: Atividade;
}

AtividadesDependencia.init(
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
    idAtividadeDependencia: {
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
    tableName: "AtividadesDependencias",
  }
);

// === Relacionamentos ===
AtividadesDependencia.belongsTo(Atividade, {
  foreignKey: "idAtividade",
  as: "atividade",
});
AtividadesDependencia.belongsTo(Atividade, {
  foreignKey: "idAtividadeDependencia",
  as: "atividadeDependencia",
});

export default AtividadesDependencia;