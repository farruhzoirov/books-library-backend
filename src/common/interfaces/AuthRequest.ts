import { Request } from 'express';

export interface AuthRequest extends Request {
    name?: string,
    email: string,
    password: string,
}