import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  DataTypes,
  CreationOptional,
} from "sequelize";
import { SequelizeHelper } from "./sequelize-helper";

class MaterialRepository extends Model<
  InferAttributes<MaterialRepository>,
  InferCreationAttributes<MaterialRepository>
> {
  declare idMaterial: CreationOptional<number>;
  declare nome_material: string;
  declare descricao: string | null;
  declare codigo_produto: string | null;
  declare valor_unitario_cotado: number | null;
  declare valor_unitario_adquirido: number | null;
  declare unidade_medida: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

MaterialRepository.init(
  {
    idMaterial: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    nome_material: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    codigo_produto: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    valor_unitario_cotado: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    valor_unitario_adquirido: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    unidade_medida: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
  },
  {
    sequelize: SequelizeHelper.sequelize,
    tableName: "Materiais",
  },
);

export default MaterialRepository;