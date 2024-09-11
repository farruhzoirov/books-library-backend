import Joi, {ValidationError} from 'joi';
import {NextFunction, Request, Response} from "express";

export const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});


export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const value = await userSchema.validateAsync(req.body);
        next()
    } catch (err) {
        if (err instanceof ValidationError) {
            res.status(400).send({
                ok: false,
                error: err?.details[0]?.message,
            });
        } else {
            res.status(500).send({
                ok: false,
                error: "Internal server error",
            });
        }
    }
}