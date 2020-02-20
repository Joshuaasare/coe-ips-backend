import { controller, get, use } from "../_shared/decorators";
import {
  IRequestWithUser,
  useCronAuthentication
} from "../_shared/middlewares";
import { Response } from "express";
import CoordinatorService from "../features/Coordinators/service";

/**
 * Task Controller
 * *This controller contains all routes related to some scheduled tasks
 */

@controller("/cron")
class TaskController {
  @get("/set-company-not-contacted")
  @use(useCronAuthentication())
  setCompanyNotContacted(req: IRequestWithUser, res: Response) {
    CoordinatorService.mutations.setCompanyContactStatusToFalse(req, res);
  }

  @get("/update-location-table")
  updateLocationTableController(req: IRequestWithUser, res: Response) {
    CoordinatorService.mutations.updateLocationTableTask(req, res);
  }

  // @get("/update-company-archive-location")
  // updateCompanyArchiveLocationController(req: IRequestWithUser, res: Response) {
  //   CoordinatorService.mutations.updateCompanyArchiveLocation(req, res);
  // }
}
