import type { Response } from 'express';

export const log = (...args: any[]): void => {
  if (process.env.LOG_LEVEL === 'debug') console.log(...args);
};

export const returnError = (res: Response, error: string, statusCode: number = 400) => {
  log('Error: ', error);
  return res.send({
    statusCode,
    error,
  });
};
