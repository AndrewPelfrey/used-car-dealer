import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connections.js"; 

class Car extends Model {
  public id!: number;
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
  public createdAt!: Date;
  public updatedAt!: Date;
}

Car.init(
  {
    vin: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // VIN is unique
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
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    engine: {
      type: DataTypes.STRING,
      allowNull: true, // Optional field
    },
    transmission: {
      type: DataTypes.STRING,
      allowNull: true, // Optional field
    },
    interior_color: {
      type: DataTypes.STRING,
      allowNull: true, // Optional field
    },
    exterior_color: {
      type: DataTypes.STRING,
      allowNull: true, // Optional field
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true, // Optional field
    },
    fuel_eco_highway: {
      type: DataTypes.FLOAT,
      allowNull: true, // Optional field
    },
    fuel_eco_city: {
      type: DataTypes.FLOAT,
      allowNull: true, // Optional field
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    image_url_1: {
      type: DataTypes.STRING,
      allowNull: true, // Optional field for the first image URL
    },
    image_url_2: {
      type: DataTypes.STRING,
      allowNull: true, // Optional field for the second image URL
    },
  },
  {
    sequelize,
    tableName: "cars",  // Define the name of the table
    timestamps: true,   // Automatically adds createdAt and updatedAt
  }
);

export default Car;
