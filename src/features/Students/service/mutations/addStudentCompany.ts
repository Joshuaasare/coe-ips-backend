import { IRequestWithUser } from "../../../../_shared/middlewares";
import { Response } from "express";
import bcrypt from "bcryptjs";
import { globals, constants } from "../../../../_shared/globals";
import {
  insertEntityRecord,
  updateEntityRecord
} from "../../../../_shared/services";

export const addStudentCompany = async (
  req: IRequestWithUser,
  res: Response
) => {
  try {
    const { user, dbInstance } = req;
    console.log(req.body);
    const {
      studentUserId,
      name,
      email,
      contact,
      address,
      repName,
      repContact,
      repEmail,
      locationId,
      acceptanceLetterUrl,
      locationDetails,
      website
    } = req.body.data;

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
      insertedLocation.insertId,
      address,
      website,
      repName,
      repContact,
      repEmail,
      Date.parse(`${new Date()}`)
    ];

    const insertedCompany = await insertEntityRecord(
      "company",
      "user_id,name,email,phone,location_id,postal_address,website,representative_name,representative_phone,representative_email,created_at",
      "?,?,?,?,?,?,?,?,?,?,?",
      [companyData],
      dbInstance
    );

    const updatedStudentData = [
      acceptanceLetterUrl,
      Date.parse(`${new Date()}`),
      true,
      false,
      insertedUser.insertId,
      Date.parse(`${new Date()}`),
      studentUserId
    ];

    const updateStudentQuery = `update student set acceptance_letter_url = ?, 
    internship_placement_date = ?, registered_company = ?, want_placement = ?, 
    company_id = ?, last_modified = ? where user_id = ?`;
    const rows = await updateEntityRecord(
      updateStudentQuery,
      [updatedStudentData],
      dbInstance
    );

    return res.status(200).send({ data: "successful" });
  } catch (error) {
    console.log(`internal error`, error);
    return res.status(422).send({ error: "Could not process request" });
  }
};
