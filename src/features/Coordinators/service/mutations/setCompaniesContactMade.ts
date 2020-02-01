import { IRequestWithUser } from "../../../../_shared/middlewares";
import { Response } from "express";
import { getAllRecords } from "../../../../_shared/services";
import forEach from "lodash/forEach";
import { globals } from "../../../../_shared/globals";

export const setCompanyContactStatusToFalse = async (
  req: IRequestWithUser,
  res: Response
) => {
  try {
    const { dbInstance } = req;
    const companies = await getAllRecords("company_archive", dbInstance);

    const allCompanyData = [];

    const currDate = new Date();

    forEach(companies, company => {
      const singleCompanyData = [
        company.id,
        currDate.getFullYear(),
        0,
        Date.parse(`${new Date()}`),
        Date.parse(`${new Date()}`)
      ];
      allCompanyData.push(singleCompanyData);
    });

    const query = `Insert into company_archive_contact_made
    (company_archive_id, acad_year, contact_made,created_at, last_modified)
    values (?,?,?,?,?)`;

    const result = await dbInstance.runPreparedQuery(query, allCompanyData);

    return res.status(200).send({ result: result, data: allCompanyData });
  } catch (error) {
    console.log(`internal error`, error);
    return res.status(422).send({ error: "Could not process request" });
  }
};
