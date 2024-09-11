import { Response } from 'express'

export const handleError = (res: Response, error: unknown, context: string) => {
   console.error(`Error in ${context} ', error`);
   res.status(500).json({
       ok: false,
       message: 'Internal Server Error',
   })
}