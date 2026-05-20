import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  DataTypes,
  CreationOptional,
} from "sequelize";
import { SequelizeHelper } from "./sequelize-helper";
import ColaboradoresRepository from "./colaboradores";

class UsuarioRepository extends Model<
  InferAttributes<UsuarioRepository>,
  InferCreationAttributes<UsuarioRepository>
> {
  declare id: CreationOptional<number>;
  declare idColaborador: number | null;
  declare nome: string;
  declare email: string;
  declare senha: string;
  declare isDeleted: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

UsuarioRepository.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    idColaborador: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    nome: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
  },
  {
    sequelize: SequelizeHelper.sequelize,
    tableName: "Usuarios",
  },
);

ColaboradoresRepository.hasMany(UsuarioRepository, {
  foreignKey: "idColaborador",
  as: "usuarios"
});

UsuarioRepository.belongsTo(ColaboradoresRepository, {
  foreignKey: "idColaborador",
  as: "colaborador"
})

export default UsuarioRepository;
