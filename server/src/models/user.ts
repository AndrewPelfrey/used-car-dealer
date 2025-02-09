import { DataTypes, type Sequelize, Model, type Optional } from 'sequelize';
import bcrypt from 'bcrypt';

interface UserAttributes {
    id: number;
    username: string;
    password: string;
    role: 'manager' | 'employee';
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User
 extends Model<UserAttributes, UserCreationAttributes>
 implements UserAttributes
 {
    public id!: number;
    public username!: string;
    public password!: string;
    public role!: 'manager' | 'employee';

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public async setPassword(password: string) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(password, saltRounds);
    }
    public async checkPassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
 }

 export function UserFactory(sequelize: Sequelize): typeof User {
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.ENUM('manager', 'employee'),
                allowNull: false,
                defaultValue: 'employee',
            }
        },
        {
            tableName: 'users',
            sequelize,
            timestamps: true,
            hooks: {
                beforeCreate: async (user: User) => {
                    await user.setPassword(user.password);
                },
                beforeUpdate: async (user: User) => {
                    await user.setPassword(user.password);
                },
            },
        }
    );
    return User;
 }