import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { globals, constants } from "../globals";
import { Database } from "../dbWrapper/Database";
import { checkIfUserExists } from "../services";

export interface IRequestWithUser extends Request {
  user: any;
  dbInstance: Database;
}

export function useAuthentication(): RequestHandler {
  return async function(
    req: IRequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    const token = req.headers.authorization.replace("Bearer ", "");
    try {
      const payload: any = jwt.verify(token, globals.JWT_SECRET_KEY);
      console.log(payload);
      req.user = payload;
      const dbInstance = new Database();
      const checkUserQuery = `select * from user where id = ?`;
      if (!checkIfUserExists(dbInstance, checkUserQuery, [payload.userId])) {
        return res.status(401).send({ error: "Authentication Failed" });
      }
      next();
    } catch (error) {
      console.log(error);
      if (error.name && error.name === constants.errors.JSON_WEB_TOKEN_ERROR) {
        return res.status(401).send({ error: "user could not be verified" });
      }

      return res.status(422).send({ error: "request could not be proccessed" });
    }
  };
}
