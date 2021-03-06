/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import { get, use, controller } from '../_shared/decorators';
import MiscService from '../features/Misc';
import { useAuthentication, useAuthorization } from '../_shared/middlewares';

@controller('')
class MiscController {
  @get('/')
  root(req: Request, res: Response) {
    return res.send('hello world');
  }

  @get('/testAuth')
  @use(useAuthentication())
  testAuthenticated(req: Request, res: Response) {
    return MiscService.testAuthenticated(req, res);
  }

  @get('/authorized')
  @use(useAuthorization())
  testAuthorized(req: Request, res: Response) {
    return MiscService.testAuthourized(req, res);
  }
}
