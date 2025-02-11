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

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Routes
app.use(routes);
app.use("/api/messages", messageRoutes);
app.use("/api/cars", carsRouter); // ✅ Car search API now uses PostgreSQL

// Seed the database
addEmployees();
seedMessages();

// Serve React static files
const clientBuildPath = path.resolve(__dirname, "../../client/dist");
app.use(express.static(clientBuildPath));

// Serve React app for frontend routing
app.get("*", (_req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

// Start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
});

export default app;

