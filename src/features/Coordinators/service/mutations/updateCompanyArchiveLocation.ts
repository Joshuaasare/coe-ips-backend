import { IRequestWithUser } from "../../../../_shared/middlewares";
import { Response } from "express";
import {
  updateEntityRecord,
  isEmpty,
  insertEntityRecord
} from "../../../../_shared/services";
import { globals } from "../../../../_shared/globals";

export const updateCompanyArchiveLocation = async (
  req: IRequestWithUser,
  res: Response
) => {
  try {
    const { user, dbInstance } = req;
    const { data } = req.body;
    console.log(data);

    const {
      id,
      name,
      email,
      phone,
      postalAddress,
      requestLetterUrl,
      locationId
    } = data.companyDetails;

    const {
      name: locationName,
      coords,
      address,
      route,
      locality,
      subLocality,
      district,
      region,
      country
    } = data.locationDetails;

    const compData = [
      name,
      phone,
      email,
      postalAddress,
      Date.parse(`${new Date()}`),
      id
    ];

    const query1 = `update company_archive set name = ?, phone = ?, email = ?, postal_address = ?,
    last_modified = ? where id = ?`;

    const updated = await updateEntityRecord(query1, [compData], dbInstance);
    if (!isEmpty(requestLetterUrl)) {
      const compArchiveContactMadeData = [
        requestLetterUrl,
        Date.parse(`${new Date()}`),
        id,
        globals.school.ACAD_YEAR
      ];
      const query2 = `update company_archive_contact_made set request_letter_url = ?,
      last_modified = ? where company_archive_id = ? and acad_year = ?`;

      await updateEntityRecord(
        query2,
        [compArchiveContactMadeData],
        dbInstance
      );
    }

    const locationData = [
      address,
      `${locationName},${locality},${country}`,
      `${route},${locality},${district},${region},${country}`,
      district,
      region,
      coords.lat,
      coords.lng,
      user.userId,
      Date.parse(`${new Date()}`)
    ];

    if (locationId) {
      locationData.push(locationId);

      console.log(locationData);
      const query3 = `update location set name = ?, address = ?, detailed_address = ?,
      district = ?, region = ?, latitude = ?, longitude = ?, updated_by = ?, last_modified = ? where id = ?`;
      await updateEntityRecord(query3, [locationData], dbInstance);

      return res.status(200).send({ data: "successful" });
    }

    locationData.push(Date.parse(`${new Date()}`));

    console.log(locationData);

    const insertedLocation = await insertEntityRecord(
      "location",
      "name, address, detailed_address, district,region,latitude, longitude,updated_by, created_at, last_modified",
      "?,?,?,?,?,?,?,?,?,?",
      [locationData],
      dbInstance
    );

    const query6 = `update company_archive set location_id = ? where id = ?`;
    await updateEntityRecord(
      query6,
      [[insertedLocation.insertId, id]],
      dbInstance
    );

    return res.status(200).send({ data: "successful" });
  } catch (error) {
    console.log(`internal error`, error);
    return res.status(422).send({ error: "Could not process request" });
  }
};
