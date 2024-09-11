import Joi, {ValidationError} from 'joi';
import {NextFunction, Request, Response} from "express";

export const authorSchema = Joi.object({
    name: Joi.string().required(),
    biography: Joi.string()
});

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const value = await authorSchema.validateAsync(req.body);
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
