import { Request, Response } from "express";
import { get, controller } from "../_shared/decorators";
import { Database } from "../_shared/dbWrapper/Database";

@controller("")
class RootController {
  @get("/")
  root(req: Request, res: Response): void {
    res.send("hello world");
  }

  @get("/users")
  async getAllUsers(req: Request, res: Response): void {
    const dbInstance = new Database();

    const query = "select * from student where acad_year = 2019";
    const results = await dbInstance.get(query);
    res.json(results);
  }
}
