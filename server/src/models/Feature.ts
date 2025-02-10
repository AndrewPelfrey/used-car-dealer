import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface FeaturesAttributes {
    id: number;
    name: string;
}

interface FeaturesCreationAttributes extends Optional<FeaturesAttributes, 'id'> {}

export class Features extends Model<FeaturesAttributes, FeaturesCreationAttributes> implements FeaturesAttributes {
    public id!: number;
    public name!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function FeaturesFactory(sequelize: Sequelize) {
    Features.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: 'features',
            sequelize, // passing the `sequelize` instance is required
        }
    );

    return Features;
}