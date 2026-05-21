import {
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  Model,
  CreationOptional,
} from "sequelize";
import { SequelizeHelper } from "./sequelize-helper";
import MaterialRepository from "./material.model";
import AtividadesRepository from "./atividades.model";

class MateriaisPlanejadoRepository extends Model<
  InferAttributes<MateriaisPlanejadoRepository>,
  InferCreationAttributes<MateriaisPlanejadoRepository>
> {
  declare id: CreationOptional<number>;
  declare idMaterial: number;
  declare idAtividade: number;
  declare quantidade_planejada: number;
  declare isDeleted: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

MateriaisPlanejadoRepository.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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
  quantidade_planejada: {
    type: DataTypes.DECIMAL(10,5),
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
}, {
  sequelize: SequelizeHelper.sequelize,
  tableName: "materiaisPlanejado",
});

MaterialRepository.hasMany(MateriaisPlanejadoRepository, {
  foreignKey: "idMaterial",
  as: "materiaisPlanejado",
});
MateriaisPlanejadoRepository.belongsTo(MaterialRepository, {
  foreignKey: "idMaterial",
  as: "material",
});

AtividadesRepository.hasMany(MateriaisPlanejadoRepository, {
  foreignKey: "idAtividade",
  as: "materiaisPlanejadoAtividades",
});

MateriaisPlanejadoRepository.belongsTo(AtividadesRepository, {
  foreignKey: "idAtividade",
  as: "atividade",
})

export default MateriaisPlanejadoRepository;
