import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { CarInfoFactory } from './CarInfo';
import { CarFactory } from './Car';
import { FeaturesFactory } from './Feature';
import { CarFeaturesFactory } from './CarFeature';

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

const CarInfo = CarInfoFactory(sequelize);
const Car = CarFactory(sequelize);
const Features = FeaturesFactory(sequelize);
const CarFeatures = CarFeaturesFactory(sequelize);

CarInfo.hasMany(Car, { foreignKey: 'car_info_id' });
Car.belongsTo(CarInfo, { foreignKey: 'car_info_id' });
Car.belongsToMany(Features, {through: CarFeatures})
Features.belongsToMany(Car, {through: CarFeatures})

export { sequelize, CarInfo, Car, Features, CarFeatures };