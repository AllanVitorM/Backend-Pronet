import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  DataTypes,
  CreationOptional,
} from "sequelize";
import { SequelizeHelper } from "./sequelize-helper";
import MaterialRepository from "./material.model";
import AtividadesRepository from "./atividades.model";
import ProjetoRepository from "./projetos.model";

class MateriaisUtilizadosRepository extends Model<
  InferAttributes<MateriaisUtilizadosRepository>,
  InferCreationAttributes<MateriaisUtilizadosRepository>
> {
  declare id: CreationOptional<number>
  declare idMaterial: number;
  declare idAtividade: number;
  declare idProjeto: number;
  declare quantidade_real: number;
  declare isDeleted: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

MateriaisUtilizadosRepository.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  idMaterial: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idAtividade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idProjeto: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantidade_real: {
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
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  sequelize: SequelizeHelper.sequelize,
  tableName: "materiaisUtilizados"
})

MaterialRepository.hasMany(MateriaisUtilizadosRepository, {
  foreignKey: "idMaterial",
  as: "materiaisUtilizados"
});
MateriaisUtilizadosRepository.belongsTo(MaterialRepository, {
  foreignKey: "idMaterial",
  as: "material",
});

AtividadesRepository.hasMany(MateriaisUtilizadosRepository,{
  foreignKey: "idAtividade",
  as: "materiaisUtilizados",
});
MateriaisUtilizadosRepository.belongsTo(AtividadesRepository, {
  foreignKey: "idAtividade",
  as: "atividade"
});

ProjetoRepository.hasMany(MateriaisUtilizadosRepository, {
  foreignKey: "idProjeto",
  as: "materiaisUtilizados",
});
MateriaisUtilizadosRepository.belongsTo(ProjetoRepository, {
  foreignKey: "idProjeto",
  as: "projeto",
});

export default MateriaisUtilizadosRepository;