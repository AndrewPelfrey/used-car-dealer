import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface CarAttributes {
    vin: number;
    make: string;
    model: string;
    year: number;
    mileage: number;
    trim: string;
    interior_color: string;
    exterior_color: string;
    description: string;
    price: number;
    image_url: string;
}

interface CarCreationAttributes extends Optional<CarAttributes, 'vin'> {}

export class Car extends Model<CarAttributes, CarCreationAttributes> implements CarAttributes {
    public vin!: number;
    public make!: string;
    public model!: string;
    public year!: number;
    public mileage!: number;
    public trim!: string;
    public interior_color!: string;
    public exterior_color!: string;
    public description!: string;
    public price!: number;
    public image_url!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function initCar(sequelize: Sequelize) {
    Car.init(
        {
            vin: {
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
            mileage: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            trim: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            interior_color: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            exterior_color: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
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