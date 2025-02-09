// import bcrypt from 'bcrypt';
import { Sequelize } from 'sequelize';
import { UserFactory } from '../models/user.js';

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: '2569',
    database: 'used_car_dealer',
});

const User = UserFactory(sequelize);

interface Employee {
    username: string;
    password: string;
}

export async function addEmployees() {
    try {
        console.log('Syncing database...');
        await sequelize.sync();
        const employees: Employee[] = [
            { username: 'Duncan', password: 'password' },
            { username: 'Kyle', password: 'password' },
            { username: 'Jeffery', password: 'password' },
            { username: 'Andrew', password: 'password' },
        ];

        for (const employee of employees) {
            console.log(`Checking if employee ${employee.username} exists`);
            const existingUser = await User.findOne({ where: { username: employee.username } });
        
            if (!existingUser) {
                
                await User.create({
                    username: employee.username,
                    password: employee.password, 
                });
        
                console.log(`Employee ${employee.username} added with hashed password.`);
            } else {
                console.log(`Employee ${employee.username} already exists.`);
            }
        }
    } catch (error) {
        console.error('Error adding employees:', error);
    }
}
