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
    role: 'manager' | 'employee';
}

export async function addEmployees() {
    try {
        console.log('Syncing database...');
        await sequelize.sync();
        const employees: Employee[] = [
            { username: 'Duncan', password: 'password', role: 'manager' },
            { username: 'Kyle', password: 'password', role: 'manager' },
            { username: 'Jeffery', password: 'password', role: 'employee' },
            { username: 'Andrew', password: 'password', role: 'employee' },
        ];

        for (const employee of employees) {
            console.log(`Checking if employee ${employee.username} exists`);
            const existingUser = await User.findOne({ where: { username: employee.username } });
        
            if (!existingUser) {
                
                await User.create({
                    username: employee.username,
                    password: employee.password,
                    role: employee.role, 
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
