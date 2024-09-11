import {Request, Response, NextFunction} from 'express';

import {AuthService} from "../services/auth.service";

const {signUp, login} = new AuthService();

export const registerController = async (req: Request, res: Response, next: NextFunction) => {
    return signUp(req, res)
};

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    return login(req, res)
};
