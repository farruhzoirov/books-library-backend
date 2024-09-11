// import { Response } from 'express';
//
// type ResponseData<T> = {
//     data?: T;
//     ok: boolean;
//     message: string;
//     token?: string;
// };
//
// export const handleResponse = <T>(
//   res: Response,
//   status: number,
//   ok: boolean,
//   message: string,
//   token?: string,
//   data?: T,
// ) => {
//     const responseObject: ResponseData<T> = {
//         ok,
//         message
//     };
//
//     if (data !== undefined) {
//         responseObject.data = data;
//     }
//
//     if (token && token.trim() !== '') {
//         responseObject.token = token;
//     }
//     const arrayResponse = [responseObject];
//
//     return res.status(status).json(arrayResponse);
// };

import {Response} from 'express'


export const handleResponse = (res: Response, status: number, ok: boolean, message: string, token?: string, others?: unknown) => {
  if (!token && !others) {
    return res.status(status).json({
      ok: ok,
      message: message,
    })
  }

  if (token && !others) {
    return res.status(status).json({
      ok: ok,
      message: message,
      token: token
    })
  }

  if (others && typeof others === 'object' && !Array.isArray(others)) {
    return res.status(status).json({
      ok: ok,
      message: message,
      data: [
        others
      ]
    })
  }
  if (others && typeof Array.isArray(others)) {
    return res.status(status).json({
      ok: ok,
      message: message,
      data: others
    })
  }
  return res.status(status).json({
    ok: ok,
    message: message,
    data: others
  })
}