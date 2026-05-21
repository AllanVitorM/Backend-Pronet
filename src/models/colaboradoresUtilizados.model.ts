import {
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  Model,
  CreationOptional,
} from "sequelize";
import { SequelizeHelper } from "./sequelize-helper";

class ColaboradoresUtilizadosRepository extends Model<
  InferAttributes<ColaboradoresUtilizadosRepository>,
  InferCreationAttributes<ColaboradoresUtilizadosRepository>
> {
  declare id: CreationOptional<number>;
  declare idAtividade: number;
  declare idProjeto: number;
  declare idResponsavel: number;
  declare idDiarioObra: number;
  declare hh_real: number;
  declare isDeleted: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

ColaboradoresUtilizadosRepository.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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
    hh_real: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
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
    tableName: "ColaboradoresUtilizados",
  },
);

export default ColaboradoresUtilizadosRepository;
