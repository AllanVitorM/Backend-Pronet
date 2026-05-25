import { InferAttributes, InferCreationAttributes, DataTypes, Model, CreationOptional } from "sequelize";
import { SequelizeHelper } from "./sequelize-helper";

class PerfisPlanejadoRepository extends Model<InferAttributes<PerfisPlanejadoRepository>, InferCreationAttributes<PerfisPlanejadoRepository>> {
  declare id: CreationOptional<number>;
  declare idAtividade: number;
  declare idPerfilColaborador: number;
  declare isDeleted: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

PerfisPlanejadoRepository.init({
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
  idPerfilColaborador: {
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
}, {
  sequelize: SequelizeHelper.sequelize,
  tableName: "PerfisPlanejado",
});

export default PerfisPlanejadoRepository;