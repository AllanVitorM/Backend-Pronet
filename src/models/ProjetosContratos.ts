import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  DataTypes,
} from "sequelize";
import { SequelizeHelper } from "./sequelize-helper";
import ProjetoRepository from "./projetos.model";
import ContratoRepository from "./contrato.model";

class ProjetosContratosRepository extends Model<
  InferAttributes<ProjetosContratosRepository>,
  InferCreationAttributes<ProjetosContratosRepository>
> {
  declare idProjeto: number;
  declare idContrato: number;
}

ProjetosContratosRepository.init(
  {
    idProjeto: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    idContrato: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    sequelize: SequelizeHelper.sequelize,
    tableName: "ProjetosContratos",
  },
);

ProjetoRepository.hasMany(ProjetosContratosRepository, {
  foreignKey: "idProjeto",
  as: "projetosContratos",
});

ProjetosContratosRepository.belongsTo(ProjetoRepository, {
  foreignKey: "idProjeto",
  as: "projeto",
});

ContratoRepository.hasMany(ProjetosContratosRepository, {
  foreignKey: "idContrato",
  as: "projetosContratos",
});

ProjetosContratosRepository.belongsTo(ContratoRepository, {
  foreignKey: "idContrato",
  as: "contrato",
});

export default ProjetosContratosRepository;
