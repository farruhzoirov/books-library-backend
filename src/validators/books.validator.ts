import {Request, Response, NextFunction} from 'express';
import Joi, {ValidationError} from "joi";

export const bookSchema = Joi.object({
    title: Joi.string().required(),
    authorName: Joi.string().required(),
    categoryName: Joi.string().required(),
    publishedYear: Joi.number(),
    summary: Joi.string()
});


export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const value = await bookSchema.validateAsync(req.body);
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