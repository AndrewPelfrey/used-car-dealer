import express from "express";
import { Op } from "sequelize";  // ✅ Import Op for filtering
import Car from "../models/Car.js";

const router = express.Router();

// GET /api/cars - Fetch cars by make, model, or year
router.get("/", async (req, res) => {
  try {
    const { make, model, year } = req.query;
    const whereClause: any = {};

    if (make) whereClause.make = { [Op.iLike]: `%${make}%` };
    if (model) whereClause.model = { [Op.iLike]: `%${model}%` };
    if (year) whereClause.year = parseInt(year as string, 10);

    const cars = await Car.findAll({ where: whereClause });
    res.json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

