import {
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  Model,
  CreationOptional,
} from "sequelize";
import { SequelizeHelper } from "./sequelize-helper";
import ColaboradoresRepository from "./colaboradores";
import AtividadesRepository from "./atividades.model";
import ProjetoRepository from "./projetos.model";
import ResponsaveisRepository from "./responsaveis.model";
import DiarioObraRepository from "./diarioobra.models";

class ColaboradoresUtilizadosRepository extends Model<
  InferAttributes<ColaboradoresUtilizadosRepository>,
  InferCreationAttributes<ColaboradoresUtilizadosRepository>
> {
  declare id: CreationOptional<number>;
  declare idColaborador: number;
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
    idColaborador: {
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
  },
  {
    sequelize: SequelizeHelper.sequelize,
    tableName: "ColaboradoresUtilizados",
  },
);

ColaboradoresRepository.hasMany(ColaboradoresUtilizadosRepository, {
  foreignKey: "idColaborador",
  as: "colaboradoresUtilizados"
});

ColaboradoresUtilizadosRepository.belongsTo(ColaboradoresRepository, {
  foreignKey: "idColaborador",
  as: "colaborador",
});

AtividadesRepository.hasMany(ColaboradoresUtilizadosRepository, {
  foreignKey: "idAtividade",
  as: "colaboradoresUtilizados"
});

ColaboradoresUtilizadosRepository.belongsTo(AtividadesRepository, {
  foreignKey: "idAtividade",
  as: "atividade"
});

ProjetoRepository.hasMany(ColaboradoresUtilizadosRepository, {
  foreignKey: "idProjeto",
  as: "colaboradoresUtilizados",
});

ColaboradoresUtilizadosRepository.belongsTo(ProjetoRepository, {
  foreignKey: "idProjeto",
  as: "projeto"
});

ResponsaveisRepository.hasMany(ColaboradoresUtilizadosRepository, {
  foreignKey: "idResponsavel",
  as: "colaboradoresUtilizados",
});

ColaboradoresUtilizadosRepository.belongsTo(ResponsaveisRepository, {
  foreignKey: "idResponsavel",
  as: "responsavel",
});

DiarioObraRepository.hasMany(ColaboradoresUtilizadosRepository, {
  foreignKey: "idDiarioObra",
  as: "colaboradoresUtilizados",
});

ColaboradoresUtilizadosRepository.belongsTo(DiarioObraRepository, {
  foreignKey: "idDiarioObra",
  as:"diarioObra",
});


export default ColaboradoresUtilizadosRepository;
