import {
    InferAttributes,
    InferCreationAttributes,
    Model,
    DataTypes,
    CreationOptional,
} from "sequelize";

import { SequelizeHelper } from "./sequelize-helper";

class MarcoRepository extends Model<
InferAttributes<MarcoRepository>,
InferCreationAttributes<MarcoRepository>
>{
    declare id: CreationOptional <number>;
    declare data_prevista: Date;
    declare data_real: Date;
    declare descricao: string;

}

MarcoRepository.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        data_prevista: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        data_real: {
            type: DataTypes.DATE,
            allowNull: false
        },
        descricao: {
            type: DataTypes.STRING(),
            allowNull: true,
        },

    },
    { sequelize: SequelizeHelper. sequelize,
        tableName: "marcos"

    }

);

export {MarcoRepository};