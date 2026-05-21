import { InferAttributes, InferCreationAttributes, DataTypes, Model, CreationOptional } from "sequelize";
import { SequelizeHelper } from "./sequelize-helper";

class PerfisResponsaveisRepository extends Model<InferAttributes<PerfisResponsaveisRepository>, InferCreationAttributes<PerfisResponsaveisRepository>>{
  declare id: CreationOptional<number>;
  declare nome: string;
  declare descricao: string;
  declare isDeleted: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

PerfisResponsaveisRepository.init({
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
  descricao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize: SequelizeHelper.sequelize,
  tableName: "PerfisResponsaveis"
});

export default PerfisResponsaveisRepository;