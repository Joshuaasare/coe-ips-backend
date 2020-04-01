/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response } from 'express';
import { controller, get, use } from '../_shared/decorators';
import { RequestWithUser, useCronAuthentication } from '../_shared/middlewares';
import CoordinatorService from '../features/Coordinators/service';

/**
 * Task Controller
 * *This controller contains all routes related to some scheduled tasks
 */

@controller('/cron')
class TaskController {
  @get('/set-company-not-contacted')
  @use(useCronAuthentication())
  setCompanyNotContacted(req: RequestWithUser, res: Response) {
    return CoordinatorService.mutations.setCompanyContactStatusToFalse(
      req,
      res
    );
  }

  // @get("/update-location-table")
  // updateLocationTableController(req: IRequestWithUser, res: Response) {
  //   CoordinatorService.mutations.updateLocationTableTask(req, res);
  // }

  // @get("/previous-student")
  // previousStudentController(req: IRequestWithUser, res: Response) {
  //   CoordinatorService.mutations.addPreviousStudents(req, res);
  // }

  // @get("/update-company-archive-location")
  // updateCompanyArchiveLocationController(req: IRequestWithUser, res: Response) {
  //   CoordinatorService.mutations.updateCompanyArchiveLocation(req, res);
  // }
}
