import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
  DataTypes,
} from "sequelize";
import { SequelizeHelper } from "./sequelize-helper";

class ColaboradoresRepository extends Model<
  InferAttributes<ColaboradoresRepository>,
  InferCreationAttributes<ColaboradoresRepository>
> {
  declare id: CreationOptional<number>;
  declare idPerfilColaborador: number;
  declare nome: string;
  declare email: string;
  declare base_salarial: number;
  declare isDeleted: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updateAt: CreationOptional<Date>;
}

ColaboradoresRepository.init({
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  idPerfilColaborador: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  base_salarial: {
    type: DataTypes.DECIMAL(10,2),
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
  updateAt: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  sequelize: SequelizeHelper.sequelize,
  tableName: "Colaboradores"
});



export default ColaboradoresRepository;
