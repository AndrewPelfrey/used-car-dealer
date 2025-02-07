import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Sample car database (Will replace with a real database)
const cars = [
  { id: 1, make: "Toyota", model: "Camry", year: 2020 },
  { id: 2, make: "Honda", model: "Civic", year: 2019 },
  { id: 3, make: "Ford", model: "Mustang", year: 2021 },
];

// ✅ Search cars by make, model, or year**

app.get("/api/cars", (req: Request, res: Response) => {
  const { make, model, year } = req.query;

  let filteredCars = cars;

  if (make) {
    filteredCars = filteredCars.filter(car => car.make.toLowerCase().includes((make as string).toLowerCase()));
  }
  if (model) {
    filteredCars = filteredCars.filter(car => car.model.toLowerCase().includes((model as string).toLowerCase()));
  }
  if (year) {
    const yearNumber = parseInt(year as string, 10);
    if (!isNaN(yearNumber)) {
      filteredCars = filteredCars.filter(car => car.year === yearNumber);
    }
  }

  return res.json(filteredCars);
});

// ✅ Get a single car by ID
app.get("/api/cars/:id", (req: Request, res: Response) => {
  const carId = parseInt(req.params.id, 10);

  if (isNaN(carId)) {
    return res.status(400).json({ error: "Invalid car ID" });
  }

  const car = cars.find(c => c.id === carId);
  if (!car) {
    return res.status(404).json({ error: "Car not found" });
  }

  return res.json(car);
});

// ✅ Ensure the server is properly started**
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

export default app; // Ensure Express app is exported properly
