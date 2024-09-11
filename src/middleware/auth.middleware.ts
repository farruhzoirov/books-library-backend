import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {IUser} from "../models/user.model";
import {Role} from "../common/enums/roles.enum";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader?.split(' ')[1];    // splitting token

        if (!token) {
            return res.status(401).json({
                error: 'No token provided',
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as IUser;

        if (!decoded || !decoded.id || !decoded.role) {
            return res.status(401).json({
                error: 'Unauthorized, invalid token',
            });
        }

        // Now we can check the role
        if (decoded.role !== Role.admin) {
            return res.status(403).json({
                error: 'Forbidden, you do not have access',
            });
        }
        next(); // Proceed to the next middleware

    } catch (error) {
        return res.status(401).json({
            error: 'Unauthorized, token is invalid or expired',
        });
    }
};
