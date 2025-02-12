import { Router, Request, Response } from "express";
import Car from "../models/Car.js";
import sequelize from "../config/connections.js"; // Import the sequelize connection
import { Op } from "sequelize"; // Ensure Op is imported

const router = Router();

// Ensure database connection before processing requests
const ensureDatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection is active.");
  } catch (error) {
    console.error("Database connection failed in carRoutes:", error);
    throw new Error("Database connection is closed.");
  }
};

// GET: Fetch distinct makes and models from the database
router.get("/cars/makes-models", async (_req: Request, res: Response) => {
  try {
    // Ensure the database connection
    await ensureDatabaseConnection();

    // Query to get distinct makes and models
    const makes = await Car.findAll({
      attributes: ["make"],
      group: ["make"], // Group by make to get unique makes
    });

    const models = await Car.findAll({
      attributes: ["model"],
      group: ["model"], // Group by model to get unique models
    });

    // Extract the makes and models into separate arrays
    const makeList = makes.map((car: any) => car.make);
    const modelList = models.map((car: any) => car.model);

    // Return the makes and models
    res.json({
      makes: makeList,
      models: modelList,
    });
  } catch (error) {
    console.error("Error fetching makes and models:", error);
    res.status(500).json({ error: "Failed to fetch makes and models" });
  }
});

// GET: Fetch cars with optional filters from the database
router.get("/cars", async (req: Request, res: Response) => {
  const { make, model, year, price_min, price_max, mileage_min, mileage_max, engine, transmission, fuel_eco_min, fuel_eco_max } = req.query;

  try {
    // Ensure the database connection
    await ensureDatabaseConnection();

    // Build dynamic query based on provided filters
    const filterConditions: any = {};

    if (make) {
      filterConditions.make = make;
    }
    if (model) {
      filterConditions.model = model;
    }
    if (year) {
      filterConditions.year = year;
    }
    if (price_min || price_max) {
      filterConditions.price = {
        ...(price_min && { [Op.gte]: price_min }), // Use Op.gte and Op.lte operators
        ...(price_max && { [Op.lte]: price_max }),
      };
    }
    if (mileage_min || mileage_max) {
      filterConditions.mileage = {
        ...(mileage_min && { [Op.gte]: mileage_min }),
        ...(mileage_max && { [Op.lte]: mileage_max }),
      };
    }
    if (engine) {
      filterConditions.engine = engine;
    }
    if (transmission) {
      filterConditions.transmission = transmission;
    }
    if (fuel_eco_min || fuel_eco_max) {
      filterConditions.fuel_eco_highway = {
        ...(fuel_eco_min && { [Op.gte]: fuel_eco_min }),
        ...(fuel_eco_max && { [Op.lte]: fuel_eco_max }),
      };
    }

    // Query the cars table with the built filter conditions
    const cars = await Car.findAll({
      where: filterConditions,
      order: [["year", "DESC"]],
    });

    res.json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ error: "Failed to fetch cars" });
  }
});

export default router;
