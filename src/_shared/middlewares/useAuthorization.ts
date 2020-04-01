import { Request, Response, NextFunction, RequestHandler } from 'express';

const isAuthorized = true;
export function useAuthorization() {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | RequestHandler> => {
    if (!isAuthorized) {
      res.send(' GEt away not authorized');
      return;
    }
    next();
  };
}
