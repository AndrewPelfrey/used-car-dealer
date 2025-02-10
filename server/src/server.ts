import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./routes/index.js";
import sequelize from "./config/connections.js";
import { addEmployees } from './seeds/addEmployees.js'
import messageRoutes from "./routes/message-routes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(routes);
app.use("/api/messages", messageRoutes);

addEmployees();

// Serve React static files
const clientBuildPath = path.resolve(__dirname, "../../client/dist");
app.use(express.static('../../client/dist'));

// Sample car database (Replace with a real database)
const cars = [
  { id: 1, make: "Toyota", model: "Camry", year: 2020 },
  { id: 2, make: "Honda", model: "Civic", year: 2019 },
  { id: 3, make: "Ford", model: "Mustang", year: 2021 },
];

// Search cars by make, model, or year
app.get("/api/cars", (req: Request, res: Response) => {
  const { make, model, year } = req.query;

  let filteredCars = cars;

  if (make) {
    filteredCars = filteredCars.filter((car) =>

      car.make.toLowerCase().includes((make as string).toLowerCase())
    );
  }
  if (model) {
    filteredCars = filteredCars.filter((car) =>
      car.model.toLowerCase().includes((model as string).toLowerCase())
    );
  }
  if (year) {
    const yearNumber = parseInt(year as string, 10);
    if (!isNaN(yearNumber)) {
      filteredCars = filteredCars.filter((car) => car.year === yearNumber);
    }
  }

  return res.json(filteredCars);
});

// Get a single car by ID
app.get("/api/cars/:id", (req: Request, res: Response) => {
  const carId = parseInt(req.params.id, 10);

  if (isNaN(carId)) {
    return res.status(400).json({ error: "Invalid car ID" });
  }

  const car = cars.find((c) => c.id === carId);
  if (!car) {
    return res.status(404).json({ error: "Car not found" });
  }

  return res.json(car);
});

// Serve React app for any unknown routes (for frontend routing)
app.get("*", (_req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

// Start the server

sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is listening on port ${PORT}`);
  });
}); 

export default app;
