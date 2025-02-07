import sequelize from "../config/connections.js";
import { UserFactory } from './user.js';

const User = UserFactory(sequelize);

export { User };