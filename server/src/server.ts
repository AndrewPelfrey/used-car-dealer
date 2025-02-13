//import express, { Request, Response } from "express";
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./routes/index.js";
import sequelize from "./config/connections.js";
import { addEmployees } from './seeds/addEmployees.js'
import { seedMessages } from "./seeds/addMessages.js";
import messageRoutes from "./routes/messageRoutes.js";
import carsRouter from "./routes/car-routes.js";
import { seedCars } from "./seeds/seedCars.js";
import employeeRoutes from "./routes/employee-routes.js"

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(routes);
app.use("/api", messageRoutes);
app.use("/api", carsRouter); // Car search API
app.use('/api', employeeRoutes);


// Serve React static files
const clientBuildPath = path.resolve(__dirname, "../../client/dist");
app.use(express.static(clientBuildPath));


// Serve React app for any unknown routes (for frontend routing)
app.get("*", (_req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

// Start the server

sequelize.sync({force: true}).then(() => {
// These run the seeds
seedCars();
addEmployees();
seedMessages();


  app.listen(PORT, () => {
    console.log(`🚀 Server is listening on port ${PORT}`);
  });
}) .catch((error) => {
  console.error("Error syncing the database:", error);
});

export default app;
