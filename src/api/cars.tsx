//THIS PAGE IS CURRENTLY NON-FUNCTIONAL
//This is an example API page that pulls the URL to gather search results from sequalize
import express from "express";
// import { Car } from "../models"; // This is or would import data from sequalize tables

const router = express.Router();

router.get("/cars", async (req, res) => {
  try {
    const { model } = req.query; // Extracts model from "?model=ford"
    const cars = await Car.findAll({
      where: model ? { model } : {},
    });

    res.json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
