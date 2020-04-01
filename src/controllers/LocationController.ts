/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Response } from 'express';
import { controller, get } from '../_shared/decorators';
import { RequestWithUser } from '../_shared/middlewares';
import { getPlacesFromSearchKey } from '../_shared/services';

@controller('/location')
class LocationController {
  @get('/places-autocomplete')
  getPlacesController(req: RequestWithUser, res: Response) {
    return getPlacesFromSearchKey(req, res);
  }
}
