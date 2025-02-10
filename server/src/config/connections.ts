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
    }
);

sequelize.authenticate()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error(' Database connection failed:', err));

  
export default sequelize;
