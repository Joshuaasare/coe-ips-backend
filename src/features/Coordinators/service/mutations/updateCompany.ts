import { Response } from 'express';
import { RequestWithUser } from '../../../../_shared/middlewares';
import { globals } from '../../../../_shared/globals';
import { updateEntityRecord } from '../../../../_shared/services';

export const updateCompany = async (
  req: RequestWithUser,
  res: Response
): Promise<Response> => {
  try {
    const { dbInstance } = req;
    const { data } = req.body;

    const { id, email, placementLetterUrl } = data;

    const companyData = [
      email,
      placementLetterUrl,
      id,
      globals.school.ACAD_YEAR,
    ];

    const query1 = `update company set email = ?, placement_letter_url = ? where user_id = ? AND acad_year = ?`;

    await updateEntityRecord(query1, [companyData], dbInstance);

    return res.status(200).send({ data: 'successful' });
  } catch (error) {
    return res.status(422).send({ error: 'Could not process request' });
  }
};

export const updateCompanyLocation = async (
  req: RequestWithUser,
  res: Response
): Promise<Response> => {
  try {
    const { dbInstance, user } = req;
    const { data } = req.body;

    const { id, email, placementLetterUrl, locationId } = data.companyDetails;

    const companyData: [string, string, number, number] = [
      email,
      placementLetterUrl,
      id,
      globals.school.ACAD_YEAR,
    ];

    const {
      name: locationName,
      coords,
      address,
      route,
      locality,
      district,
      region,
      country,
    } = data.locationDetails;

    const locationData = [
      address,
      `${locationName},${locality},${country}`,
      `${route},${locality},${district},${region},${country}`,
      district,
      region,
      coords.lat,
      coords.lng,
      user.userId,
      Date.parse(`${new Date()}`),
      locationId,
    ];

    const query1 = `update company set email = ?, placement_letter_url = ? where user_id = ? AND acad_year = ?`;
    const query2 = `update location set name = ?, address = ?, detailed_address = ?,
    district = ?, region = ?, latitude = ?, longitude = ?, updated_by = ?, last_modified = ? where id = ?`;

    await updateEntityRecord(query1, [companyData], dbInstance);
    await updateEntityRecord(query2, [locationData], dbInstance);

    return res.status(200).send({ data: 'successful' });
  } catch (error) {
    return res.status(422).send({ error: 'Could not process request' });
  }
};
