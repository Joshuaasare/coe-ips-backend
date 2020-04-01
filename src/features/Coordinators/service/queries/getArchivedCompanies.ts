import { Response } from 'express';
import { getAllRecords } from '../../../../_shared/services';
import { RequestWithUser } from '../../../../_shared/middlewares';
import { globals } from '../../../../_shared/globals';

export const getArchivedCompanies = async (
  req: RequestWithUser,
  res: Response
): Promise<Response> => {
  try {
    const { dbInstance } = req;
    const companies = await getAllRecords('company_archive', dbInstance, true);
    return res.status(200).send({ data: companies });
  } catch (error) {
    return res.status(422).send({ error: 'Could not process request' });
  }
};

export const getArchivedCompaniesWithContactMade = async (
  req: RequestWithUser,
  res: Response
): Promise<Response> => {
  try {
    const { dbInstance } = req;
    const archivedCompanyQuery = `company_archive.id as id,
    company_archive.name,
    company_archive.email,
    company_archive.postal_address,
    company_archive.phone,
    company_archive.website`;

    const contactMadeQuery = `company_archive_contact_made.contact_made as contact_made,
    company_archive_contact_made.acad_year as acad_year,
    company_archive_contact_made.request_letter_url as request_letter_url`;

    const locationQuery = `location.id as location_id, location.name as location_name,
    location.address as location_address, location.district, location.region,
    location.latitude as lat, location.longitude as lng`;

    const join1 = `(company_archive right join company_archive_contact_made on company_archive.id = company_archive_contact_made.company_archive_id)`;
    const join2 = `(location right join ${join1} on company_archive.location_id = location.id)`;

    const condition = `acad_year = ? AND is_deleted = 0`;
    const order = `order by company_archive.name`;

    const mainQuery = `select ${archivedCompanyQuery}, ${contactMadeQuery}, ${locationQuery} from ${join2} where ${condition} ${order}`;
    const companies = await dbInstance.runPreparedSelectQuery(mainQuery, [
      globals.school.ACAD_YEAR,
    ]);
    return res.status(200).send({ data: companies });
  } catch (error) {
    return res.status(422).send({ error: 'Could not process request' });
  }
};
