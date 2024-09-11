import {Request, Response} from "express";
import bcrypt from "bcryptjs";
import {AuthRequest} from "../common/interfaces/AuthRequest";

// Role enum
import {Role} from "../common/enums/roles.enum";

// For helping
import {createToken} from "../utils/jwt";
import {handleError} from "../utils/error";

// Bcrypt service
import {BcryptService} from "./bcrypt.service";
const {generateHash, compareHash} = new BcryptService();

// User model
import IUser from "../models/user.model";
import {handleResponse} from "../utils/response";

// Admin emails array
const adminEmails = [
    process.env.ADMIN_EMAIL as string,
]

export class AuthService {
    async signUp(req: Request, res: Response) {
        try {
            const {name, email, password} = req.body as AuthRequest['body'];
            let hashedPassword: string;
            const isEmailExist = await IUser.findOne({email});

            if (isEmailExist) {
                return handleResponse(res, 400, false, 'Email already exists');
            }
            if (adminEmails.includes(email)) {
                hashedPassword = await generateHash(password);

                const newUser = new IUser({
                    name,
                    email,
                    password: hashedPassword,
                    role: Role.admin
                });
                await newUser.save();
                const token = createToken(newUser);
                return handleResponse(res, 201, true, 'User registered successfully', token);
            }
            hashedPassword = await generateHash(password);
            const newUser = new IUser({
                name,
                email,
                password: hashedPassword
            });
            await newUser.save();
            const token = createToken(newUser);
            return handleResponse(res, 201, true, 'User registered successfully', token);
        } catch (error) {
            handleError(res, error, 'Register Service');
        }
    }


    async login(req: Request, res: Response) {
        try {
            const {email, password} = req.body as AuthRequest['body'];

            const isUserExist = await IUser.findOne({email});

            if (!isUserExist) {
                return handleResponse(res, 404, false, 'User not registered');
            }
            const hashedPassword = isUserExist.password
            const isPasswordMatches = await compareHash(password, hashedPassword)
            if (!isPasswordMatches) {
                return handleResponse(res, 400, false, "Password doesn't match");
            }
            const token = createToken(isUserExist);
            return handleResponse(res, 200, true, 'User logged in successfully', token);

        } catch (error) {
            handleError(res, error, 'Login Controller');
        }
    }
}