import sequelize from "../config/connections.js";  // Ensure this import path is correct
import Car from "../models/Car.js";  // Ensure this import path is correct

export const seedCars = async () => {
  try {
    console.log("Seeding cars...");
    // await sequelize.sync({ force: true }); to reset the database 
    await sequelize.sync();
    console.log("✅ Database synced!");

    if (!Car) {
      throw new Error("❌ Car model is undefined! Check the import path.");
    }

    const existingCars = await Car.findAll();
    if (existingCars.length > 0) {
      console.log("✅ Car database already seeded.");
      return;
    }

    const carsData = [
      {
        vin: "1HGCM82633A123456",
        make: "Honda",
        model: "Accord",
        year: 2020,
        mileage: 25000,
        engine: "2.4L I4",
        transmission: "Automatic",
        interior_color: "Black",
        exterior_color: "Blue",
        description: "A reliable sedan with great fuel economy and a comfortable ride.",
        fuel_eco_highway: 34,
        fuel_eco_city: 26,
        price: 22000,
        image_url_1: "https://example.com/car1.jpg",
        image_url_2: "https://example.com/car1-2.jpg",
      },
      {
        vin: "1FMCU0J98FUC12345",
        make: "Ford",
        model: "Escape",
        year: 2021,
        mileage: 18000,
        engine: "1.5L EcoBoost",
        transmission: "Automatic",
        interior_color: "Gray",
        exterior_color: "Red",
        description: "Compact SUV with all-wheel drive and excellent fuel efficiency.",
        fuel_eco_highway: 30,
        fuel_eco_city: 23,
        price: 25000,
        image_url_1: "https://example.com/car2.jpg",
        image_url_2: "https://example.com/car2-2.jpg",
      },
      {
        vin: "WA1LAAF76JD123456",
        make: "Audi",
        model: "Q5",
        year: 2019,
        mileage: 30000,
        engine: "2.0L Turbo",
        transmission: "Automatic",
        interior_color: "Beige",
        exterior_color: "White",
        description: "Luxury SUV with a premium interior and advanced technology.",
        fuel_eco_highway: 28,
        fuel_eco_city: 20,
        price: 35000,
        image_url_1: "https://example.com/car3.jpg",
        image_url_2: "https://example.com/car3-2.jpg",
      },
      {
        vin: "2C4RC1BG0FR123456",
        make: "Chrysler",
        model: "Pacifica",
        year: 2020,
        mileage: 15000,
        engine: "3.6L V6",
        transmission: "Automatic",
        interior_color: "Tan",
        exterior_color: "Silver",
        description: "Spacious minivan with seating for 7 and a smooth ride.",
        fuel_eco_highway: 28,
        fuel_eco_city: 19,
        price: 27000,
        image_url_1: "https://example.com/car4.jpg",
        image_url_2: "https://example.com/car4-2.jpg",
      },
      {
        vin: "3VW5B7AU2HM123456",
        make: "Volkswagen",
        model: "Golf",
        year: 2018,
        mileage: 40000,
        engine: "1.8L I4",
        transmission: "Manual",
        interior_color: "Black",
        exterior_color: "Green",
        description: "Compact hatchback with sporty handling and excellent fuel economy.",
        fuel_eco_highway: 34,
        fuel_eco_city: 26,
        price: 16000,
        image_url_1: "https://example.com/car5.jpg",
        image_url_2: "https://example.com/car5-2.jpg",
      },
    ];

    console.log("Seeding the following cars:", JSON.stringify(carsData, null, 2));

    await Car.bulkCreate(carsData);

    console.log("✅ Car database seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
};
