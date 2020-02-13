import { controller, get, use } from "../_shared/decorators";
import {
  IRequestWithUser,
  useCronAuthentication
} from "../_shared/middlewares";
import { Response } from "express";
import CoordinatorService from "../features/Coordinators/service";

@controller("/cron")
class TaskController {
  @get("/set-company-not-contacted")
  @use(useCronAuthentication())
  setCompanyNotContacted(req: IRequestWithUser, res: Response) {
    CoordinatorService.mutations.setCompanyContactStatusToFalse(req, res);
  }

  @get("/update-location-table")
  updateLocationTableController(req: IRequestWithUser, res: Response) {
    CoordinatorService.mutations.updateLocationTable(req, res);
  }
}
