import { Sequelize, DataTypes, Model, Optional } from "sequelize";

// Initialize Sequelize with SQLite for testing (change for PostgreSQL, MySQL, etc.)
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

// Define Car attributes interface
interface CarAttributes {
  id: number;
  model: string;
  year: number;
  price: number;
  color: string;
}

// Define Car creation interface (since `id` is auto-generated)
interface CarCreationAttributes extends Optional<CarAttributes, "id"> {}

// Define Car model with Sequelize
class Car extends Model<CarAttributes, CarCreationAttributes> implements CarAttributes {
  public id!: number;
  public model!: string;
  public year!: number;
  public price!: number;
  public color!: string;
}

// Initialize the Car model
Car.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    model: { type: DataTypes.STRING, allowNull: false },
    year: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    color: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: "Car" }
);

// Sync database and insert sample data for testing
sequelize.sync({ force: true }).then(async () => {
  console.log("Database & Car table created!");

  await Car.bulkCreate([
    { model: "Ford", year: 2020, price: 18000, color: "red" },
    { model: "Toyota", year: 2019, price: 22000, color: "blue" },
    { model: "Honda", year: 2021, price: 25000, color: "black" },
    { model: "Ford", year: 2018, price: 15000, color: "white" },
  ]);

  console.log("Sample cars added.");
});

export { sequelize, Car };
