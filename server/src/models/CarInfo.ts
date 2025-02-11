import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface CarInfoAttributes {
    id: number;
    engine: string;
    transmission: string;
    drive_train: string;
    fuel_type: string;
    fuel_eco_city: number;
    fuel_eco_highway: number;
}
interface CarInfoCreationAttributes extends Optional<CarInfoAttributes, 'id'> {}

export class CarInfo extends Model<CarInfoAttributes, CarInfoCreationAttributes> implements CarInfoAttributes {
    public id!: number;
    public engine!: string;
    public transmission!: string;
    public drive_train!: string;
    public fuel_type!: string;
    public fuel_eco_city!: number;
    public fuel_eco_highway!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}
export function CarInfoFactory(sequelize: Sequelize) {
    CarInfo.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            engine: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            transmission: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            drive_train: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            fuel_type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            fuel_eco_city: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            fuel_eco_highway: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
        },
        {
            tableName: 'car_info',
            sequelize, // passing the `sequelize` instance is required
        }
    );
    return CarInfo;
}