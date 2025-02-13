import { Router, Request, Response } from "express";
import Car from "../models/Car.js";
import sequelize from "../config/connections.js";
import { Op } from "sequelize";

const router = Router();

const ensureDatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection is active.");
  } catch (error) {
    console.error("Database connection failed in carRoutes:", error);
    throw new Error("Database connection is closed.");
  }
};

router.get("/cars", async (req: Request, res: Response) => {
  const { make, model, year, price_min, price_max, mileage_min, mileage_max, engine, transmission, fuel_eco_min, fuel_eco_max } = req.query;

  try {
    await ensureDatabaseConnection();

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
        ...(price_min && { [Op.gte]: price_min }),
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
