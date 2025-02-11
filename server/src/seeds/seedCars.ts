import sequelize from "../config/connections.js";
import Cars from "../models/CarSearch.js";

export const seedCars = async () => {
  try {
    console.log("Seeding cars..."); 
    await sequelize.sync();
    console.log("Database synced!");

    const existingCars = await Cars.findAll();
    if (existingCars.length > 0) {
      console.log("Database already seeded.");
      return;
    }

    await Cars.bulkCreate([
      { make: "Toyota", model: "Camry", year: 2022 },
      { make: "Honda", model: "Civic", year: 2021 },
      { make: "Ford", model: "Mustang", year: 2020 },
      { make: "Chevrolet", model: "Malibu", year: 2019 },
      { make: "Tesla", model: "Model 3", year: 2023 },
    ]);

    console.log("✅ Car database seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    process.exit();  // Exit the process after seeding
  }
};



