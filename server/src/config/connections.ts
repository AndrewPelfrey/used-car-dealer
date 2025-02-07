import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';

console.log('Database Password:', process.env.DB_PASSWORD);

const sequelize = process.env.DB_URL
? new Sequelize(process.env.DB_URL)
: new Sequelize(
   'test_db',
   'postgres',
   '2569',
    {
        host: 'localhost',
        dialect: 'postgres',
        dialectOptions: {
            decimalNumbers: true,
        },
    }
);

export default sequelize;