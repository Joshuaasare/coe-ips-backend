import { RequestHandler, Request, Response, NextFunction } from "express";

export function useCronAuthentication(): RequestHandler {
  return async function(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.get("X-Appengine-Cron")) {
        return res.status(401).send({ error: "Authentication Failed" });
      }
      next();
    } catch (error) {
      console.log("error");
      return res.status(422).send({ error: "request could not be proccessed" });
    }
  };
}
