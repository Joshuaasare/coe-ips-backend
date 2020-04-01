import { Response } from 'express';
import forEach from 'lodash/forEach';
import { RequestWithUser } from '../../../../_shared/middlewares';
import { getAllRecords } from '../../../../_shared/services';

export const setCompanyContactStatusToFalse = async (
  req: RequestWithUser,
  res: Response
): Promise<Response> => {
  try {
    const { dbInstance } = req;
    const companies = await getAllRecords('company_archive', dbInstance, true);

    const allCompanyData = [];

    const currDate = new Date();

    forEach(
      companies as Record<string, string | number | boolean>[],
      (company) => {
        const singleCompanyData = [
          company.id,
          currDate.getFullYear(),
          0,
          Date.parse(`${new Date()}`),
          Date.parse(`${new Date()}`),
        ];
        allCompanyData.push(singleCompanyData);
      }
    );

    const query = `Insert into company_archive_contact_made
    (company_archive_id, acad_year, contact_made,created_at, last_modified)
    values (?,?,?,?,?)`;

    const result = await dbInstance.runPreparedQueryForCron(
      query,
      allCompanyData
    );

    return res.status(200).send({ result, data: allCompanyData });
  } catch (error) {
    return res.status(422).send({ error: 'Could not process request' });
  }
};
