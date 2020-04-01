/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response } from 'express';
import { controller, post, get, use, put } from '../_shared/decorators';
import AuthService from '../features/Auth';
import { useAuthentication, RequestWithUser } from '../_shared/middlewares';

@controller('/auth')
class AuthController {
  @post('/verify-user')
  verifyUser(req: RequestWithUser, res: Response) {
    return AuthService.verifyUser(req, res);
  }

  @put('/reset-password')
  resetPassword(req: RequestWithUser, res: Response) {
    return AuthService.resetPassword(req, res);
  }

  @get('/verify-with-token')
  @use(useAuthentication())
  verifyWithToken(req: RequestWithUser, res: Response) {
    return AuthService.verifyWithToken(req, res);
  }
}
