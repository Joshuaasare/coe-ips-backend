import { Request, Response } from "express";
import { get, controller } from "../_shared/decorators";

@controller("")
class RootController {
  @get("/")
  root(req: Request, res: Response): void {
    res.send("hello world");
  }

  @get("/users")
  getAllUsers(req: Request, res: Response): void {}
}
