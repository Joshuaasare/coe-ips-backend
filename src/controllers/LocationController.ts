import { controller, get } from "../_shared/decorators";
import { IRequestWithUser } from "../_shared/middlewares";
import { Response } from "express";
import { getPlacesFromSearchKey } from "../_shared/services";

@controller("/location")
class LocationController {
  @get("/places-autocomplete")
  getPlacesController(req: IRequestWithUser, res: Response) {
    return getPlacesFromSearchKey(req, res);
  }
}
