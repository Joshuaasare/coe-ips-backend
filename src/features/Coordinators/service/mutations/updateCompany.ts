import { IRequestWithUser } from "../../../../_shared/middlewares";
import { Response } from "express";
import { globals } from "../../../../_shared/globals";
import { updateEntityRecord } from "../../../../_shared/services";

export const updateCompany = async (req: IRequestWithUser, res: Response) => {
  try {
    const { dbInstance } = req;
    const { data } = req.body;
    console.log(data);

    const { id, email, placementLetterUrl } = data;

    const companyData = [
      email,
      placementLetterUrl,
      id,
      globals.school.ACAD_YEAR
    ];

    const query1 = `update company set email = ?, placement_letter_url = ? where user_id = ? AND acad_year = ?`;

    await updateEntityRecord(query1, [companyData], dbInstance);

    return res.status(200).send({ data: "successful" });
  } catch (error) {
    console.log(`internal error`, error);
    return res.status(422).send({ error: "Could not process request" });
  }
};

export const updateCompanyLocation = async (
  req: IRequestWithUser,
  res: Response
) => {
  try {
    const { dbInstance, user } = req;
    const { data } = req.body;

    const {
      id,
      name,
      email,
      placementLetterUrl,
      locationId
    } = data.companyDetails;

    const companyData = [
      email,
      placementLetterUrl,
      id,
      globals.school.ACAD_YEAR
    ];

    const {
      name: locationName,
      coords,
      address,
      route,
      locality,
      subLocality,
      district,
      region,
      country,
      google_place_id
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
      locationId
    ];

    const query1 = `update company set email = ?, placement_letter_url = ? where user_id = ? AND acad_year = ?`;
    const query2 = `update location set name = ?, address = ?, detailed_address = ?,
    district = ?, region = ?, latitude = ?, longitude = ?, updated_by = ?, last_modified = ? where id = ?`;

    await updateEntityRecord(query1, [companyData], dbInstance);
    await updateEntityRecord(query2, [locationData], dbInstance);

    console.log(data);
    return res.status(200).send({ data: "successful" });
  } catch (error) {
    console.log(`internal error`, error);
    return res.status(422).send({ error: "Could not process request" });
  }
};
