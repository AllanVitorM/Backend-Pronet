import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  DataTypes,
  CreationOptional,
} from "sequelize";
import { SequelizeHelper } from "./sequelize-helper";


class DiarioObraRepository extends Model<
    InferAttributes<DiarioObraRepository>,
    InferCreationAttributes<DiarioObraRepository>
> {
    declare id: CreationOptional<number>;
    declare data_registro: Date;
    declare percentual_atividade: number;
    declare descricao: string;}

    DiarioObraRepository.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            data_registro: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            percentual_atividade: {
                type: DataTypes.DECIMAL(5,2),
                allowNull: false,
            },
            
            descricao: {
                type: DataTypes.STRING,
                allowNull: false,

            }
        },
        {sequelize: SequelizeHelper.sequelize,
            tableName: "DiárioObra"
        }
    );

    export default DiarioObraRepository;