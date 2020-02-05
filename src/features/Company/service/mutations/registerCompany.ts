import { IRequestWithUser } from "../../../../_shared/middlewares";
import bcrypt from "bcryptjs";
import { Response } from "express";
import { globals, constants } from "../../../../_shared/globals";
import {
  insertEntityRecord,
  updateEntityRecord
} from "../../../../_shared/services";
import forEach from "lodash/forEach";

export const registerCompany = async (req: IRequestWithUser, res: Response) => {
  try {
    const { dbInstance } = req;
    console.log(req.body.data);
    const {
      id,
      name,
      email,
      contact,
      postal_address,
      website,
      repName,
      repContact,
      repEmail,
      locationId,
      locationDetails,
      code,
      departments
    } = req.body.data;

    const verifyCodeQuery = `select * from company_archive_contact_made  where acad_year = ? AND company_archive_id = ?`;

    const verifyCodeData = [globals.school.ACAD_YEAR, id];
    const company = await dbInstance.runPreparedSelectQuery(
      verifyCodeQuery,
      verifyCodeData
    );

    console.log(company[0]);

    if (!company[0] || (company[0] && company[0].contact_made === 0)) {
      return res.status(404).send({ data: "Company has not been contacted" });
    }

    if (company[0] && company[0].responded === 1) {
      return res.status(409).send({ data: "Company has already responded" });
    }

    if (company[0].code !== parseInt(code, 10)) {
      return res.status(401).send({ data: "Not Authenticated" });
    }

    const hash = await bcrypt.hash(contact, globals.SALT_ROUNDS);
    const locationData = [
      locationDetails.name,
      locationDetails.address,
      locationDetails.coords.lat,
      locationDetails.coords.lng,
      Date.parse(`${new Date()}`),
      Date.parse(`${new Date()}`)
    ];

    const userData = [
      constants.user_type_id.COMPANY,
      email,
      hash,
      Date.parse(`${new Date()}`),
      Date.parse(`${new Date()}`)
    ];

    const insertedLocation = await insertEntityRecord(
      "location",
      "name,address,latitude,longitude,created_at, last_modified",
      "?,?,?,?,?,?",
      [locationData],
      dbInstance
    );

    const insertedUser = await insertEntityRecord(
      "user",
      "user_type_id,email,password,created_at, last_modified",
      "?,?,?,?,?",
      [userData],
      dbInstance
    );

    const companyData = [
      insertedUser.insertId,
      name,
      email,
      contact,
      globals.school.ACAD_YEAR,
      insertedLocation.insertId,
      postal_address,
      website,
      repName,
      repContact,
      repEmail,
      Date.parse(`${new Date()}`),
      Date.parse(`${new Date()}`)
    ];

    const insertedCompany = await insertEntityRecord(
      "company",
      "user_id,name,email,phone,acad_year,location_id,postal_address,website,representative_name,representative_phone,representative_email,created_at,last_modified",
      "?,?,?,?,?,?,?,?,?,?,?,?,?",
      [companyData],
      dbInstance
    );

    const departmentsData = [];

    forEach(departments, department => {
      const dep = [
        insertedUser.insertId,
        department.id,
        globals.school.ACAD_YEAR,
        department.number,
        Date.parse(`${new Date()}`),
        Date.parse(`${new Date()}`)
      ];
      departmentsData.push(dep);
    });

    await insertEntityRecord(
      "company_sub_department",
      "company_id,sub_department_id,acad_year,number_needed,created_at,last_modified",
      "?,?,?,?,?,?",
      departmentsData,
      dbInstance
    );

    const updateCompanyData = [globals.school.ACAD_YEAR, id];

    const updateCompanyQuery = `update company_archive_contact_made set responded = 1 where
    acad_year = ? AND company_archive_id = ?`;

    await updateEntityRecord(
      updateCompanyQuery,
      [updateCompanyData],
      dbInstance
    );

    return res.status(200).send({ data: "successful" });
  } catch (error) {
    console.log(`internal error`, error);
    return res.status(422).send({ error: "Could not process request" });
  }
};
