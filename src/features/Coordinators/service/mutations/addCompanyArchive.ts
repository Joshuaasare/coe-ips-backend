import { IRequestWithUser } from "../../../../_shared/middlewares";
import { Response } from "express";
import { insertEntityRecord } from "../../../../_shared/services";
import { globals } from "../../../../_shared/globals";

export const addCompanyArchive = async (
  req: IRequestWithUser,
  res: Response
) => {
  try {
    const { dbInstance } = req;
    const {
      name,
      email,
      phone,
      website,
      repName,
      repEmail,
      repContact,
      postalAddress,
      hasRequestedPlacement
    } = req.body.data;

    console.log(req.body.data);
    const data = [
      name,
      email,
      phone,
      postalAddress,
      website,
      repName,
      repContact,
      repEmail,
      Date.parse(`${new Date()}`),
      Date.parse(`${new Date()}`)
    ];

    const insertedCompany = await insertEntityRecord(
      "company_archive",
      "name,email,phone,postal_address,website,representative_name,representative_phone, representative_email, created_at, last_modified",
      "?,?,?,?,?,?,?,?,?,?",
      [data],
      dbInstance
    );

    if (hasRequestedPlacement === 1) {
      const contactMadeData = [
        insertedCompany.insertId,
        globals.school.ACAD_YEAR,
        1,
        globals.school.DEFAULT_COMPANY_CODE,
        Date.parse(`${new Date()}`),
        Date.parse(`${new Date()}`)
      ];

      await insertEntityRecord(
        "company_archive_contact_made",
        "company_archive_id, acad_year,contact_made,code,created_at,last_modified",
        "?,?,?,?,?,?",
        [contactMadeData],
        dbInstance
      );

      return res.status(200).send({ data: "successful" });
    } else {
      const contactMadeData = [
        insertedCompany.insertId,
        globals.school.ACAD_YEAR,
        0,
        Date.parse(`${new Date()}`),
        Date.parse(`${new Date()}`)
      ];

      await insertEntityRecord(
        "company_archive_contact_made",
        "company_archive_id, acad_year,contact_made,created_at,last_modified",
        "?,?,?,?,?",
        [contactMadeData],
        dbInstance
      );

      return res.status(200).send({ data: "successful" });
    }
  } catch (error) {
    console.log(`internal error`, error);
    return res.status(422).send({ error: "Could not process request" });
  }
};
