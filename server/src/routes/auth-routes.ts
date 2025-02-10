import { Router, type Request, type Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await User.findOne({
        where: { username },
    });
    if (!user) {
        return res.status(401).json({ message: 'User not found' });
    }
    console.log("Stored hash from DB:", user.password);
    console.log("Entered password:", password);

    const passwordIsValid = await bcrypt.compare(password, user.password);
    console.log("Password match result:", passwordIsValid);

    if (!passwordIsValid) {
        return res.status(401).json({ message: 'Incorrect password' });
    }

    const secretKey = process.env.JWT_SECRET_KEY || '';

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role}, secretKey, { expiresIn: '1h' });
    return res.json({ token,
        role: user.role
     });
};

const router = Router();

router.post('/login', login);

export default router;

