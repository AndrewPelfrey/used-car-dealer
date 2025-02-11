import { DataTypes, Model } from "sequelize";
import sequelize from "../config/connections.js";

class Cars extends Model {}

Cars.init(
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
  },
  {
    sequelize,
    modelName: "car",
    timestamps: false,  // Disable timestamps (createdAt/updatedAt)
  }
);

export default Cars;

