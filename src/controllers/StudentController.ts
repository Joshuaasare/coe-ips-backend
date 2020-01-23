import { Request, Response } from "express";
import { controller, post, get, use, put } from "../_shared/decorators";
import { IRequestWithUser, useAuthentication } from "../_shared/middlewares";
import StudentService from "../features/Students/service";

@controller("/student")
class StudentController {
  @post("/register")
  registerController(req: IRequestWithUser, res: Response) {
    return StudentService.mutations.registerStudent(req, res);
  }

  @get("/current-student")
  @use(useAuthentication())
  currentStudentkController(req: IRequestWithUser, res: Response) {
    return StudentService.queries.getCurrentStudent(req, res);
  }

  @post("/add-student-company")
  @use(useAuthentication())
  addStudentCompanyController(req: IRequestWithUser, res: Response) {
    return StudentService.mutations.addStudentCompany(req, res);
  }

  @put("/update-student-company")
  @use(useAuthentication())
  updateStudentCompanyController(req: IRequestWithUser, res: Response) {
    return StudentService.mutations.updateStudentCompany(req, res);
  }

  @put("/update-internship-start")
  @use(useAuthentication())
  updateInternshipStartController(req: IRequestWithUser, res: Response) {
    return StudentService.mutations.updateInternshipStart(req, res);
  }
}
