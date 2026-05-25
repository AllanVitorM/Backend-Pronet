import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  DataTypes,
  CreationOptional,
} from "sequelize";
import { SequelizeHelper } from "./sequelize-helper";

class ResponsaveisRepository extends Model<
  InferAttributes<ResponsaveisRepository>,
  InferCreationAttributes<ResponsaveisRepository>
> {
  declare id: CreationOptional<number>;
  declare idUsuario: number;
  declare idPerfilResponsavel: number;
  declare descricao: string;
  declare isDeleted: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

ResponsaveisRepository.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idPerfilResponsavel: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  descricao: {
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
}, {
  sequelize: SequelizeHelper.sequelize,
  tableName: "Responsaveis"
})

export default ResponsaveisRepository;