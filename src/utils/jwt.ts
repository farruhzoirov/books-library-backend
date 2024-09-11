import jwt from 'jsonwebtoken'
import {IUser} from "../models/user.model";

export const createToken = (user: IUser): string => {
    return jwt.sign({
            id: user._id,
            role: user.role,
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: '1d'
        }
    )
}