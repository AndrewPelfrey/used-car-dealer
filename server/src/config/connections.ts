import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
// COMMENT OUT BELOW TO RUN LOCAL HOST
const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, 
        },
      },
    })
  :new Sequelize(
      process.env.DB_NAME as string,
      process.env.DB_USER as string,
      process.env.DB_PASSWORD as string,
      {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT as string, 10) || 5432,
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
// UNCOMMENT THIS, AND COMMENT OUT ABOVE TO RUN ON LOCAL HOST
    // const sequelize = new Sequelize(
    //   process.env.DB_NAME as string,
    //   process.env.DB_USER as string,
    //   process.env.DB_PASSWORD as string,
    //   {
    //     host: process.env.DB_HOST || 'localhost',
    //     port: parseInt(process.env.DB_PORT as string, 10) || 5432,
    //     dialect: 'postgres',
    //     dialectOptions: {
    //       decimalNumbers: true,
    //     },
    //     pool: {
    //       max: 10,
    //       min: 0,
    //       acquire: 30000,
    //       idle: 10000,
    //     },
    //   }
    // );


sequelize.authenticate()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error(' Database connection failed connection.ts:', err));
  // console.log(process.env.DATABASE_URL); 
export default sequelize;
