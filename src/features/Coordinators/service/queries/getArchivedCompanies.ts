import { Response } from "express";
import { getAllRecords } from "../../../../_shared/services";
import { IRequestWithUser } from "../../../../_shared/middlewares";
import { globals } from "../../../../_shared/globals";

export const getArchivedCompanies = async (
  req: IRequestWithUser,
  res: Response
): Promise<any> => {
  try {
    const { dbInstance } = req;
    const companies = await getAllRecords("company_archive", dbInstance);
    console.log(companies[0]);
    return res.status(200).send({ data: companies });
  } catch (error) {
    console.log(`internal error`, error);
    return res.status(422).send({ error: "Could not process request" });
  }
};

export const getArchivedCompaniesWithContactMade = async (
  req: IRequestWithUser,
  res: Response
): Promise<any> => {
  try {
    const { dbInstance } = req;
    const archivedCompanyQuery = `company_archive.id as company_archive_id,
    company_archive.name,
    company_archive.email,
    company_archive.postal_address,
    company_archive.phone`;

    const contactMadeQuery = `company_archive_contact_made.contact_made as contact_made,
    company_archive_contact_made.acad_year as acad_year`;

    const join1 = `(company_archive left join company_archive_contact_made on company_archive.id = company_archive_contact_made.company_archive_id)`;
    // const join2 = `(company_archive right join company_archive_contact_made on company_archive.id = company_archive_contact_made.company_archive_id)`;

    // const mainQuery = `select ${archivedCompanyQuery}, ${contactMadeQuery} from ${join1} UNION
    // select ${archivedCompanyQuery}, ${contactMadeQuery} from ${join2} `;

    const mainQuery = `select ${archivedCompanyQuery}, ${contactMadeQuery} from ${join1}`;
    const companies = await dbInstance.runPreparedSelectQuery(mainQuery, []);
    console.log(companies[0]);
    return res.status(200).send({ data: companies });
  } catch (error) {
    console.log(`internal error`, error);
    return res.status(422).send({ error: "Could not process request" });
  }
};