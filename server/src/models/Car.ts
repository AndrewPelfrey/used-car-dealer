import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface CarAttributes {
    id: number;
    make: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    color: string;
    description: string;
    image_url: string;
}

interface CarCreationAttributes extends Optional<CarAttributes, 'id'> {}

export class Car extends Model<CarAttributes, CarCreationAttributes> implements CarAttributes {
    public id!: number;
    public make!: string;
    public model!: string;
    public year!: number;
    public price!: number;
    public mileage!: number;
    public color!: string;
    public description!: string;
    public image_url!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function initCar(sequelize: Sequelize) {
    Car.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            make: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            model: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            year: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            mileage: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            color: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            image_url: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            tableName: 'cars',
            sequelize, // passing the `sequelize` instance is required
        }
    );
}