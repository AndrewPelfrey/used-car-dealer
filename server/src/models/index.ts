import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import Car from './Car'; // Import the Car model directly
import { User } from './user';

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

export { sequelize, Car, User }; // Export sequelize and models as needed
