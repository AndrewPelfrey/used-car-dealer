import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';

console.log('Database Password:', process.env.DB_PASSWORD);

const sequelize = process.env.DB_URL
? new Sequelize(process.env.DB_URL)
: new Sequelize(
  process.env.DB_NAME || '',
  process.env.DB_USER || '', 
  process.env.DB_PASSWORD || '',
    {
        host: 'localhost',
        dialect: 'postgres',
        dialectOptions: {
            decimalNumbers: true,
        },
    }
);

export default sequelize;

sequelize.authenticate()
  .then(() => console.log('✅ Connected to the database'))
  .catch(err => console.error('❌ Database connection failed:', err));
