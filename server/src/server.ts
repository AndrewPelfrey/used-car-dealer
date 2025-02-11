import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import sequelize from "./config/connections.js";
import routes from "./routes/index.js";
import carsRouter from "./routes/cars.js";
import messageRoutes from "./routes/messageRoutes.js";
import { addEmployees } from "./seeds/addEmployees.js";
import { seedMessages } from "./seeds/addMessages.js";
import { seedCars } from "./seeds/seedCars.js";  // Import the seedCars function

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json()); // Handles incoming JSON requests

// Routes
app.use(routes); // General routes
app.use("/api/messages", messageRoutes);
app.use("/api/cars", carsRouter); // Car search API

// Seed the database on startup
addEmployees();
seedMessages();
seedCars();  // Seed cars after employees and messages

// Serve React static files (after the build process)
const clientBuildPath = path.resolve(__dirname, "../../client/dist");
app.use(express.static(clientBuildPath));  // Serve static files from 'dist' folder

// Serve React app for frontend routing
app.get("*", (_req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

// Start the server and synchronize database
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
});

export default app;
