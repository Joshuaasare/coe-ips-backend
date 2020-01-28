import { get, controller, use, put } from "../_shared/decorators";
import { useAuthentication, IRequestWithUser } from "../_shared/middlewares";
import { Response } from "express";
import CoordinatorService from "../features/Coordinators/service";

@controller("/coordinator")
class CoordinatorController {
  @get("/archived-companies")
  @use(useAuthentication())
  archivedCompaniesController(req: IRequestWithUser, res: Response) {
    CoordinatorService.queries.getArchivedCompanies(req, res);
  }

  @get("/archived-companies-contact-made")
  archivedCompaniesWithContactMadeController(
    req: IRequestWithUser,
    res: Response
  ) {
    CoordinatorService.queries.getArchivedCompaniesWithContactMade(req, res);
  }
}
