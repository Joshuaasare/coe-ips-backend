import { get, controller, use, put, del, post } from "../_shared/decorators";
import { useAuthentication, IRequestWithUser } from "../_shared/middlewares";
import { Response } from "express";
import CoordinatorService from "../features/Coordinators/service";

@controller("/coordinator")
class CoordinatorController {
  @post("/add-company-archive")
  @use(useAuthentication())
  addCompanyArchiveController(req: IRequestWithUser, res: Response) {
    CoordinatorService.mutations.addCompanyArchive(req, res);
  }

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

  @get("/sub-departments")
  getSubDepartmentsController(req: IRequestWithUser, res: Response) {
    CoordinatorService.queries.getSubDepartments(req, res);
  }

  @del("/delete-company-archive")
  @use(useAuthentication())
  deleteCompanyArchiveController(req: IRequestWithUser, res: Response) {
    CoordinatorService.mutations.deleteCompanyArchive(req, res);
  }

  @put("/placement-request")
  @use(useAuthentication())
  sendPlacementRequestController(req: IRequestWithUser, res: Response) {
    CoordinatorService.mutations.sendPlacementRequest(req, res);
  }

  @put("/update-company-archive")
  @use(useAuthentication())
  updateCompanyArchiveController(req: IRequestWithUser, res: Response) {
    CoordinatorService.mutations.updateCompanyArchive(req, res);
  }
}
