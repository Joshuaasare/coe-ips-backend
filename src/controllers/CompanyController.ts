import { post, controller } from "../_shared/decorators";
import { IRequestWithUser } from "../_shared/middlewares";
import { Response } from "express";
import CompanyService from "../features/Company/service";

@controller("/company")
class CompanyController {
  @post("/register-company")
  registerCompanyController(req: IRequestWithUser, res: Response) {
    CompanyService.mutations.registerCompany(req, res);
  }
}
