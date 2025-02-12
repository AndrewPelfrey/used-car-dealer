import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface CarAttributes {
    vin: string;
    make: string;
    model: string;
    year: number;
    mileage: number;
    engine: string;
    transmission: string;
    interior_color: string;
    exterior_color: string;
    description: string;
    fuel_eco_highway: number;
    fuel_eco_city: number;
    price: number;
    image_url_1: string;
    image_url_2: string;
}

interface CarCreationAttributes extends Optional<CarAttributes, 'vin'> {}

export class Car extends Model<CarAttributes, CarCreationAttributes> implements CarAttributes {
    public vin!: string;
    public make!: string;
    public model!: string;
    public year!: number;
    public mileage!: number;
    public engine!: string;
    public transmission!: string;
    public interior_color!: string;
    public exterior_color!: string;
    public description!: string;
    public fuel_eco_highway!: number;
    public fuel_eco_city!: number;
    public price!: number;
    public image_url_1!: string;
    public image_url_2!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function CarFactory(sequelize: Sequelize) {
    Car.init(
        {
            vin: {
                type: DataTypes.STRING,
                allowNull: false,
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
            engine: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            transmission: {
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
            fuel_eco_highway: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            fuel_eco_city: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            image_url_1: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            image_url_2: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            tableName: 'car',
            sequelize, // passing the `sequelize` instance is required
        }
    );
    return Car;
}
