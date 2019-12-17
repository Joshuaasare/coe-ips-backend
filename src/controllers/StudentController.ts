import { Request, Response } from "express";
import { controller, post } from "../_shared/decorators";
import StudentService from "../features/Students";

@controller("/student")
class StudentController {
  @post("/register")
  registerController(req: Request, res: Response) {
    return StudentService.registerStudent(req, res);
  }
}
