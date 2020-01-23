import { IRequestWithUser } from "../../../../_shared/middlewares";
import { Response } from "express";
import bcrypt from "bcryptjs";
import { globals } from "../../../../_shared/globals";
import { updateEntityRecord } from "../../../../_shared/services";

export const updateStudentCompany = async (
  req: IRequestWithUser,
  res: Response
) => {
  try {
    const { dbInstance } = req;
    const {
      companyId,
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
      website,
      supervisorName,
      supervisorContact,
      supervisorEmail
    } = req.body.data;

    console.log(req.body.data);

    const hash = await bcrypt.hash(contact, globals.SALT_ROUNDS);
    const locationData = [
      locationDetails.name,
      locationDetails.address,
      locationDetails.coords.lat,
      locationDetails.coords.lng,
      Date.parse(`${new Date()}`),
      locationDetails.id
    ];

    const userData = [email, hash, Date.parse(`${new Date()}`), companyId];

    const companyData = [
      name,
      email,
      contact,
      address,
      website,
      repName,
      repContact,
      repEmail,
      Date.parse(`${new Date()}`),
      companyId
    ];

    const studentData = [
      acceptanceLetterUrl,
      supervisorName,
      supervisorContact,
      supervisorEmail,
      Date.parse(`${new Date()}`),
      studentUserId
    ];

    const updateLocationQuery = `update location set name = ?,address = ?,latitude = ?, 
    longitude = ?, last_modified = ? where id = ?`;
    const updatedLocation = await updateEntityRecord(
      updateLocationQuery,
      [locationData],
      dbInstance
    );

    const updateUserQuery = `update user set email = ?, password = ?, last_modified = ? where user_id = ?`;

    const updateCompanyQuery = `update company set name = ?,email = ?,
    phone = ?,postal_address = ?,website = ?,representative_name = ?, representative_phone = ?,
    representative_email = ?, last_modified = ? where user_id = ?`;

    const updatedCompany = await updateEntityRecord(
      updateCompanyQuery,
      [companyData],
      dbInstance
    );

    const updateStudentQuery = `update student set acceptance_letter_url = ?,supervisor_name = ?,
    supervisor_contact = ?,supervisor_email = ?, last_modified = ? where user_id = ?`;

    const updatedStudent = await updateEntityRecord(
      updateStudentQuery,
      [studentData],
      dbInstance
    );

    return res.status(200).send({ data: "successful" });
  } catch (error) {
    console.log(`internal error`, error);
    return res.status(422).send({ error: "Could not process request" });
  }
};
