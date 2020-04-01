/* eslint-disable @typescript-eslint/camelcase */
import { Response } from 'express';
import { RequestWithUser } from '../../../../_shared/middlewares';
import { updateEntityRecord } from '../../../../_shared/services';

/**
 * update student without location details
 * TODO: !!!!!! VERY IMPORTANT write query such that without location can be resued!!!!!!!!
 * !students can update with or without location so
 * !any change should be made twice
 * @param req request
 * @param res response
 */
export const updateStudent = async (
  req: RequestWithUser,
  res: Response
): Promise<Response> => {
  try {
    const { dbInstance } = req;
    const { data } = req.body;
    const { id, surname, otherNames, indexNumber, email, phone } = data;

    const userData = [email, id];

    const studentData = [
      surname,
      otherNames,
      email,
      indexNumber,
      phone,
      Date.parse(`${new Date()}`),
      id,
    ];

    const query1 = `update student set surname = ?, other_names = ?,
    email = ?, index_number = ?, phone = ?, last_modified = ? where user_id = ? `;

    const query2 = `update user set email = ? where id = ?`;

    await updateEntityRecord(query1, [studentData], dbInstance);
    await updateEntityRecord(query2, [userData], dbInstance);

    return res.status(200).send({ data: 'Successful' });
  } catch (error) {
    return res.status(422).send({ error: 'Could not process request' });
  }
};

export const updateStudentLocation = async (
  req: RequestWithUser,
  res: Response
): Promise<Response> => {
  try {
    const { dbInstance, user } = req;
    const { data } = req.body;

    const {
      id,
      surname,
      otherNames,
      indexNumber,
      email,
      phone,
      locationId,
    } = data.studentDetails;

    const {
      name: locationName,
      coords,
      address,
      route,
      locality,
      district,
      region,
      country,
      google_place_id,
    } = data.locationDetails;

    const studentData = [
      surname,
      otherNames,
      email,
      indexNumber,
      phone,
      locationName,
      address,
      google_place_id,
      coords.lat,
      coords.lng,
      Date.parse(`${new Date()}`),
      id,
    ];

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

    const userData = [email, id];

    const query1 = `update student set surname = ?, other_names = ?,
    email = ?, index_number = ?, phone = ?, location = ?, address = ?,
    google_place_id = ?, latitude = ?, longitude = ?, last_modified = ?
    where user_id = ? `;

    const query2 = `update location set name = ?, address = ?, detailed_address = ?,
    district = ?, region = ?, latitude = ?, longitude = ?, updated_by = ?, last_modified = ? where id = ?`;

    const query3 = `update user set email = ? where id = ?`;

    await updateEntityRecord(query1, [studentData], dbInstance);
    await updateEntityRecord(query2, [locationData], dbInstance);
    await updateEntityRecord(query3, [userData], dbInstance);

    return res.status(200).send({ data: 'Successful' });
  } catch (error) {
    return res.status(422).send({ error: 'Could not process request' });
  }
};
