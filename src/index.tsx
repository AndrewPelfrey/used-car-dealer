import express from "express";
import cors from "cors"; // Not a mispelling, cors is middleware
import carRoutes from "./api/cars";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", carRoutes);

const PORT: number = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
