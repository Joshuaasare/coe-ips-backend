/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Response } from 'express';
import { post, controller } from '../_shared/decorators';
import { RequestWithUser } from '../_shared/middlewares';
import CompanyService from '../features/Company/service';

@controller('/company')
class CompanyController {
  @post('/register-company')
  registerCompanyController(req: RequestWithUser, res: Response) {
    return CompanyService.mutations.registerCompany(req, res);
  }
}
