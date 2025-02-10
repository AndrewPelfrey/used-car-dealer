import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// the following should contain !process.env.DB_PASSWORD, but that throws an error for an empty one
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME || !process.env.DB_DIALECT) {
    throw new Error("Missing required database environment variables");
  }

// Set up a Sequelize instance and export it
export const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  username: process.env.DB_USER,
  password: "",  // Database password
  database: process.env.DB_NAME,
  logging: false,  // Disable logging for cleaner output
});

// Optional: Test the connection when the app starts
sequelize.authenticate()
  .then(() => {
    console.log("Database connection established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

export default sequelize;
