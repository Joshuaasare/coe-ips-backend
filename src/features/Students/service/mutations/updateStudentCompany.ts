import { Response } from 'express';
import { RequestWithUser } from '../../../../_shared/middlewares';
import { updateEntityRecord } from '../../../../_shared/services';

export const updateStudentCompany = async (
  req: RequestWithUser,
  res: Response
): Promise<Response> => {
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
      acceptanceLetterUrl,
      locationDetails,
      website,
      supervisorName,
      supervisorContact,
      supervisorEmail,
    } = req.body.data;

    const locationData = [
      locationDetails.name,
      locationDetails.address,
      locationDetails.coords.lat,
      locationDetails.coords.lng,
      Date.parse(`${new Date()}`),
      locationDetails.id,
    ];

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
      companyId,
    ];

    const studentData = [
      acceptanceLetterUrl,
      supervisorName,
      supervisorContact,
      supervisorEmail,
      Date.parse(`${new Date()}`),
      studentUserId,
    ];

    const updateLocationQuery = `update location set name = ?,address = ?,latitude = ?, 
    longitude = ?, last_modified = ? where id = ?`;
    await updateEntityRecord(updateLocationQuery, [locationData], dbInstance);

    const updateCompanyQuery = `update company set name = ?,email = ?,
    phone = ?,postal_address = ?,website = ?,representative_name = ?, representative_phone = ?,
    representative_email = ?, last_modified = ? where user_id = ?`;

    await updateEntityRecord(updateCompanyQuery, [companyData], dbInstance);

    const updateStudentQuery = `update student set acceptance_letter_url = ?,supervisor_name = ?,
    supervisor_contact = ?,supervisor_email = ?, last_modified = ? where user_id = ?`;

    await updateEntityRecord(updateStudentQuery, [studentData], dbInstance);

    return res.status(200).send({ data: 'successful' });
  } catch (error) {
    return res.status(422).send({ error: 'Could not process request' });
  }
};
