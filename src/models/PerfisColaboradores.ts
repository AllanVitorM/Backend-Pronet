import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  DataTypes,
  CreationOptional,
} from "sequelize";
import { SequelizeHelper } from "./sequelize-helper";
import SindicatoRepository from "./sindicato";

class PerfisColaboradoresRepository extends Model<InferAttributes<PerfisColaboradoresRepository>, InferCreationAttributes<PerfisColaboradoresRepository>> {
  declare id: CreationOptional<number>;
  declare idSindicato: number;
  declare nome_cargo: string;
  declare descricao: string;
  declare isDeleted: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

PerfisColaboradoresRepository.init({
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  idSindicato: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  nome_cargo: {
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
  tableName: "PerfisColaboradores"
});

SindicatoRepository.hasMany(PerfisColaboradoresRepository, {
  foreignKey: "idSindicato",
  as: "sindicato",
})

PerfisColaboradoresRepository.belongsTo(SindicatoRepository, {
  foreignKey: "idSindicato",
  as: "PerfisColaboradores"
});

