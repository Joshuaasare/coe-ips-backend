/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
import 'reflect-metadata';
import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';
import { AppRouter } from '../AppRouter';
import { Methods, MetadataKeys } from '../globals';

function bodyValidators(keys: string[]) {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ): RequestHandler | Response => {
    if (!req.body) {
      return res.status(422).send('Invalid request');
    }

    for (const key of keys) {
      if (!req.body[key]) {
        return res.status(422).send(`missing property ${key}`);
      }
    }

    next();
  };
}

export function controller(routePrefix: string) {
  return (target: Function): void => {
    for (const key in target.prototype) {
      if (Object.prototype.hasOwnProperty.call(target.prototype, key)) {
        const routeHandler = target.prototype[key];
        const path: string = Reflect.getMetadata(
          MetadataKeys.path,
          target.prototype,
          key
        );
        const method: Methods = Reflect.getMetadata(
          MetadataKeys.method,
          target.prototype,
          key
        );

        const middlewares =
          Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) ||
          [];

        const requiredBodyProps =
          Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) ||
          [];

        const validator = bodyValidators(requiredBodyProps);
        const router: Router = AppRouter.getInstance();
        // eslint-disable-next-line no-console
        console.log(routePrefix + path);
        if (path) {
          router[method](
            `${routePrefix}${path}`,
            ...middlewares,
            validator,
            routeHandler
          );
        }
      }
    }
  };
}
