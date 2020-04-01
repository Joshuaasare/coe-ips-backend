/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Response } from 'express';
import { get, controller, use, put, del, post } from '../_shared/decorators';
import { useAuthentication, RequestWithUser } from '../_shared/middlewares';
import CoordinatorService from '../features/Coordinators/service';

@controller('/coordinator')
class CoordinatorController {
  @post('/add-company-archive')
  @use(useAuthentication())
  addCompanyArchiveController(req: RequestWithUser, res: Response) {
    return CoordinatorService.mutations.addCompanyArchive(req, res);
  }

  @get('/students')
  @use(useAuthentication())
  getStudentsController(req: RequestWithUser, res: Response) {
    return CoordinatorService.queries.getAllStudents(req, res);
  }

  @get('/archived-companies')
  @use(useAuthentication())
  archivedCompaniesController(req: RequestWithUser, res: Response) {
    return CoordinatorService.queries.getArchivedCompanies(req, res);
  }

  @get('/archived-companies-contact-made')
  archivedCompaniesWithContactMadeController(
    req: RequestWithUser,
    res: Response
  ) {
    return CoordinatorService.queries.getArchivedCompaniesWithContactMade(
      req,
      res
    );
  }

  @get('/sub-departments')
  getSubDepartmentsController(req: RequestWithUser, res: Response) {
    return CoordinatorService.queries.getSubDepartments(req, res);
  }

  @del('/delete-company-archive')
  @use(useAuthentication())
  deleteCompanyArchiveController(req: RequestWithUser, res: Response) {
    return CoordinatorService.mutations.deleteCompanyArchive(req, res);
  }

  @put('/placement-request')
  @use(useAuthentication())
  sendPlacementRequestController(req: RequestWithUser, res: Response) {
    return CoordinatorService.mutations.sendPlacementRequest(req, res);
  }

  @put('/update-company-archive')
  @use(useAuthentication())
  updateCompanyArchiveController(req: RequestWithUser, res: Response) {
    return CoordinatorService.mutations.updateCompanyArchive(req, res);
  }

  @put('/update-company-archive-location')
  @use(useAuthentication())
  updateCompanyArchiveLocationController(req: RequestWithUser, res: Response) {
    return CoordinatorService.mutations.updateCompanyArchiveLocation(req, res);
  }

  @put('/update-student')
  @use(useAuthentication())
  updateStudentController(req: RequestWithUser, res: Response) {
    return CoordinatorService.mutations.updateStudent(req, res);
  }

  @put('/update-student-location')
  @use(useAuthentication())
  updateStudentLocationController(req: RequestWithUser, res: Response) {
    return CoordinatorService.mutations.updateStudentLocation(req, res);
  }

  @get('/companies-with-slots')
  @use(useAuthentication())
  getCompaniesWithSlotsController(req: RequestWithUser, res: Response) {
    return CoordinatorService.queries.getCompaniesWithSlots(req, res);
  }

  @put('/update-placement')
  @use(useAuthentication())
  updatePlacementController(req: RequestWithUser, res: Response) {
    return CoordinatorService.mutations.updatePlacement(req, res);
  }

  @put('/update-company')
  @use(useAuthentication())
  updateCompanyController(req: RequestWithUser, res: Response) {
    return CoordinatorService.mutations.updateCompany(req, res);
  }

  @put('/update-company-location')
  @use(useAuthentication())
  updateCompanyLocationController(req: RequestWithUser, res: Response) {
    return CoordinatorService.mutations.updateCompanyLocation(req, res);
  }

  @get('/company-students')
  @use(useAuthentication())
  getCompanyStudentsController(req: RequestWithUser, res: Response) {
    return CoordinatorService.queries.getCompanyStudents(req, res);
  }

  @put('/placement-letter')
  @use(useAuthentication())
  sendPlacementLetterController(req: RequestWithUser, res: Response) {
    return CoordinatorService.mutations.sendPlacementLetter(req, res);
  }
}
