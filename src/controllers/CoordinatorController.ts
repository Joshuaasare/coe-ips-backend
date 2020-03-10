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

  @get("/students")
  @use(useAuthentication())
  getStudentsController(req: IRequestWithUser, res: Response) {
    CoordinatorService.queries.getAllStudents(req, res);
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

  @put("/update-company-archive-location")
  @use(useAuthentication())
  updateCompanyArchiveLocationController(req: IRequestWithUser, res: Response) {
    CoordinatorService.mutations.updateCompanyArchiveLocation(req, res);
  }

  @put("/update-student")
  @use(useAuthentication())
  updateStudentController(req: IRequestWithUser, res: Response) {
    CoordinatorService.mutations.updateStudent(req, res);
  }

  @put("/update-student-location")
  @use(useAuthentication())
  updateStudentLocationController(req: IRequestWithUser, res: Response) {
    CoordinatorService.mutations.updateStudentLocation(req, res);
  }

  @get("/companies-with-slots")
  @use(useAuthentication())
  getCompaniesWithSlotsController(req: IRequestWithUser, res: Response) {
    CoordinatorService.queries.getCompaniesWithSlots(req, res);
  }

  @put("/update-placement")
  @use(useAuthentication())
  updatePlacementController(req: IRequestWithUser, res: Response) {
    CoordinatorService.mutations.updatePlacement(req, res);
  }

  @put("/update-company")
  @use(useAuthentication())
  updateCompanyController(req: IRequestWithUser, res: Response) {
    CoordinatorService.mutations.updateCompany(req, res);
  }

  @put("/update-company-location")
  @use(useAuthentication())
  updateCompanyLocationController(req: IRequestWithUser, res: Response) {
    CoordinatorService.mutations.updateCompanyLocation(req, res);
  }

  @get("/company-students")
  @use(useAuthentication())
  getCompanyStudentsController(req: IRequestWithUser, res: Response) {
    CoordinatorService.queries.getCompanyStudents(req, res);
  }

  @put("/placement-letter")
  @use(useAuthentication())
  sendPlacementLetterController(req: IRequestWithUser, res: Response) {
    CoordinatorService.mutations.sendPlacementLetter(req, res);
  }
}
