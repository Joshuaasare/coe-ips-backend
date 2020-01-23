import { Request, Response } from "express";
import { controller, post, get, use, put } from "../_shared/decorators";
import AuthService from "../features/Auth";
import { useAuthentication, IRequestWithUser } from "../_shared/middlewares";

@controller("/auth")
class AuthController {
  @post("/verify-user")
  verifyUser(req: IRequestWithUser, res: Response) {
    return AuthService.verifyUser(req, res);
  }

  @put("/reset-password")
  resetPassword(req: IRequestWithUser, res: Response) {
    return AuthService.resetPassword(req, res);
  }

  @get("/verify-with-token")
  @use(useAuthentication())
  verifyWithToken(req: IRequestWithUser, res: Response) {
    return AuthService.verifyWithToken(req, res);
  }
}
