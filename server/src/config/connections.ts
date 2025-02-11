import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';

const sequelize = process.env.DB_URL
? new Sequelize(process.env.DB_URL)
: new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string, 
  process.env.DB_PASSWORD as string,
    {
        host: 'localhost',
        dialect: 'postgres',
        dialectOptions: {
            decimalNumbers: true,
        },
        pool: {
          max: 10,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
    }
);

sequelize.authenticate()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error(' Database connection failed connection.ts:', err));

  
export default sequelize;
