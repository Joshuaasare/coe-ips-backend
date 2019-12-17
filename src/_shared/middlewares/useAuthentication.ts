import { Request, Response, NextFunction, RequestHandler } from "express";

const isAuthenticated: boolean = true;
export function useAuthentication(): RequestHandler {
  return async function(req: Request, res: Response, next: NextFunction) {
    if (!isAuthenticated) {
      res.send(" Get away kraa not authenticated");
      return;
    }
    next();
  };
}
