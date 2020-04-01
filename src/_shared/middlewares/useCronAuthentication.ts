import { RequestHandler, Request, Response, NextFunction } from 'express';

export function useCronAuthentication() {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
    // eslint-disable-next-line consistent-return
  ): Promise<Response | RequestHandler> => {
    try {
      if (!req.get('X-Appengine-Cron')) {
        return res.status(401).send({ error: 'Authentication Failed' });
      }
      next();
    } catch (error) {
      return res.status(422).send({ error: 'request could not be proccessed' });
    }
  };
}
