import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME || !process.env.DB_DIALECT) {
    throw new Error("Missing required database environment variables");
  }

// Set up a Sequelize instance and export it
export const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",    // Database host
  username: process.env.DB_USER,  // Database username
  password: process.env.DB_PASSWORD,  // Database password
  database: process.env.DB_NAME,  // Database name
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
