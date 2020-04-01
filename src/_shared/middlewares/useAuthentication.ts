import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { globals, constants } from '../globals';
import { Database } from '../dbWrapper/Database';
import { checkIfUserExists } from '../services';
import { JWTpayload } from '../../features/Auth/VerifyUser';

export interface RequestWithUser extends Request {
  user: JWTpayload;
  dbInstance: Database;
}

export function useAuthentication() {
  return async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
    // eslint-disable-next-line consistent-return
  ): Promise<RequestHandler | Response> => {
    try {
      const token: string = req.headers.authorization.replace('Bearer ', '');
      const payload = jwt.verify(token, globals.JWT_SECRET_KEY);
      // console.log(payload);
      req.user = payload as JWTpayload;
      const dbInstance = new Database();
      const checkUserQuery = `select * from user where id = ?`;
      if (!checkIfUserExists(dbInstance, checkUserQuery, [req.user.userId])) {
        return res.status(401).send({ error: 'Authentication Failed' });
      }
      next();
    } catch (error) {
      if (error.name && error.name === constants.errors.JSON_WEB_TOKEN_ERROR) {
        return res.status(401).send({ error: 'user could not be verified' });
      }

      return res.status(422).send({ error: 'request could not be proccessed' });
    }
  };
}
