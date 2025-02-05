//THIS PAGE IS CURRENTLY NON-FUNCTIONAL
//This is an example API page that pulls the URL to gather search results from sequalize

import express, { Request, Response } from "express";
import { Op } from "sequelize";
import { Car } from "../models/carModel";

const router = express.Router();

// Define an interface for expected query parameters
interface CarQueryParams {
  model?: string;
  year?: string;
  price?: string;
  color?: string;
}

// Get filtered cars
router.get("/cars", async (req: Request<{}, {}, {}, CarQueryParams>, res: Response) => {
  try {
    const { model, year, price, color } = req.query;

    const filters: any = {};
    if (model) filters.model = model;
    if (year) filters.year = parseInt(year, 10); // Convert to number
    if (price) filters.price = { [Op.lte]: parseFloat(price) }; // Convert to number
    if (color) filters.color = color;

    const cars = await Car.findAll({ where: filters });
    res.json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
