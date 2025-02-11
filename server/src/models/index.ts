import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { CarInfoFactory } from './CarInfo';  // Assuming this is another model factory
import Cars from './Car';  // Import Cars model directly (no need to call it as a function)
import { FeaturesFactory } from './Feature';  // Another model factory
import { CarFeaturesFactory } from './CarFeature';  // Relationship model factory

// Initialize Sequelize connection
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

// Create the models using the factories
const CarInfo = CarInfoFactory(sequelize);
const Features = FeaturesFactory(sequelize);
const CarFeatures = CarFeaturesFactory(sequelize);

// Define relationships
CarInfo.hasMany(Cars, { foreignKey: 'car_info_id' });
Cars.belongsTo(CarInfo, { foreignKey: 'car_info_id' });
Cars.belongsToMany(Features, { through: CarFeatures });
Features.belongsToMany(Cars, { through: CarFeatures });

export { sequelize, CarInfo, Cars, Features, CarFeatures };

