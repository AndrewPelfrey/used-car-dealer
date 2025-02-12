import express from "express";
import { Op } from "sequelize";  // Import Op for filtering
import Cars from "../models/CarSearch.js";

const carsRouter = express.Router();

// GET /api/cars - Fetch cars by make, model, or year
carsRouter.get("/", async (req, res) => {

  try {
    // Extract query parameters safely
    const make = req.query.make as string | undefined;
    const model = req.query.model as string | undefined;
    const year = req.query.year as string | undefined;

    const whereClause: { [key: string]: any } = {}; // Initialize empty where clause for filtering

    // Build where clause based on provided query parameters
    if (make) whereClause.make = { [Op.iLike]: `%${make}%` };  // Case-insensitive search for 'make'
    if (model) whereClause.model = { [Op.iLike]: `%${model}%` };  // Case-insensitive search for 'model'
    if (year && !isNaN(parseInt(year, 10))) whereClause.year = parseInt(year, 10);  // Filter by year if valid number

    // Query the database to find all cars that match the filter criteria
    const cars = await Cars.findAll({ where: whereClause });

    // Respond with the fetched cars data
    res.json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default carsRouter;



