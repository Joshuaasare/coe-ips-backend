import { Request, Response, NextFunction } from "express";

const isAuthorized: boolean = true;
export function useAuthorization() {
  return async function(req: Request, res: Response, next: NextFunction) {
    if (!isAuthorized) {
      res.send(" GEt away not authorized");
      return;
    }
    next();
  };
}
