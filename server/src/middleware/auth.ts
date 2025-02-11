import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
    id: number;
    username: string;
    role: string;
}

interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
}

export const authenticateToken = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("Unauthorized: No token provided");
        res.sendStatus(401);
        return;
    }

    const token = authHeader.split(" ")[1];
    const secretKey = process.env.JWT_SECRET_KEY || "";

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.log("Forbidden: Invalid token", err);
            res.sendStatus(403);
            return;
        }

        console.log("Decoded token:", decoded);
        req.user = decoded as JwtPayload;
        next();
    });

    return;
};
