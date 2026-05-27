import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  DataTypes,
  CreationOptional,
} from "sequelize";
import { SequelizeHelper } from "./sequelize-helper";
import AtividadesRepository from "./atividades.model";

class AtividadesDependenciaRepository extends Model<
  InferAttributes<AtividadesDependenciaRepository>,
  InferCreationAttributes<AtividadesDependenciaRepository>
> {
  declare id: CreationOptional<number>;
  declare idAtividade: number;
  declare idAtividadeDependencias: number;
  declare isDeleted: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

AtividadesDependenciaRepository.init(
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
    idAtividadeDependencias: {
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
  },
);

AtividadesRepository.hasMany(AtividadesDependenciaRepository, {
  foreignKey: "idAtividade",
  as: "dependencias",
});

AtividadesDependenciaRepository.belongsTo(AtividadesRepository, {
  foreignKey: "idAtividade",
  as: "atividade",
});

AtividadesDependenciaRepository.belongsTo(AtividadesRepository, {
  foreignKey: "idAtividadeDependencia",
  as: "atividadeDependencia",
});

export default AtividadesDependenciaRepository;
