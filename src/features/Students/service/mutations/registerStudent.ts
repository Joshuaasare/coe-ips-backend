import { Response } from 'express';
import bcrypt from 'bcryptjs';
import { RequestWithDbConnection } from '../../../..';
import { constants, globals } from '../../../../_shared/globals';
import {
  getEntityRecordFromKey,
  insertEntityRecord,
} from '../../../../_shared/services';
import { PostRows } from '../../../../_shared/dbWrapper/Database';

export const registerStudent = async (
  req: RequestWithDbConnection,
  res: Response
): Promise<Response> => {
  try {
    const { dbInstance } = req;
    const {
      surname,
      password,
      phone,
      department,
      email,
      foreignStudent,
      haveCompany,
      indexNumber,
      locationDetails,
      locationId,
      otherNames,
      programme,
      yearOfStudy,
    } = req.body.data;

    const hash = await bcrypt.hash(password, globals.SALT_ROUNDS);

    const {
      name: locationName,
      coords,
      address,
      route,
      locality,
      district,
      region,
      country,
    } = locationDetails;

    const locationData = [
      address,
      `${locationName},${locality},${country}`,
      `${route},${locality},${district},${region},${country}`,
      district,
      region,
      coords.lat,
      coords.lng,
      Date.parse(`${new Date()}`),
      Date.parse(`${new Date()}`),
    ];

    const userData = [
      constants.user_type_id.STUDENT,
      email,
      hash,
      Date.parse(`${new Date()}`),
      Date.parse(`${new Date()}`),
    ];

    const user = await getEntityRecordFromKey(
      'user',
      'email',
      [email],
      dbInstance
    );

    if (!((user as Record<string, string | boolean | number>[]).length === 0)) {
      return res.status(409).send({ error: 'User already exist' });
    }

    const insertedLocation = await insertEntityRecord(
      'location',
      'name, address, detailed_address, district, region, latitude, longitude,created_at, last_modified',
      '?,?,?,?,?,?,?,?,?',
      [locationData],
      dbInstance
    );

    const insertedUser = await insertEntityRecord(
      'user',
      'user_type_id, email,password,created_at, last_modified',
      '?,?,?,?,?',
      [userData],
      dbInstance
    );

    const studentData = [
      (insertedUser as PostRows).insertId,
      indexNumber,
      surname,
      otherNames,
      department,
      programme,
      phone,
      email,
      yearOfStudy,
      globals.school.ACAD_YEAR,
      locationDetails.name,
      locationDetails.address,
      locationId,
      locationDetails.coords.lat,
      locationDetails.coords.lng,
      foreignStudent,
      (insertedLocation as PostRows).insertId,
      haveCompany === 0 ? 1 : 0,
      Date.parse(`${new Date()}`),
      Date.parse(`${new Date()}`),
    ];

    const response = await insertEntityRecord(
      'student',
      'user_id,index_number,surname,other_names,main_department_id,sub_department_id,phone,email,year_of_study,acad_year,location,address,google_place_id,latitude,longitude,foreign_student,location_id,want_placement,created_at,last_modified',
      '?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?',
      [studentData],
      dbInstance
    );
    return res.status(200).send({ data: response });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).send({ error: { message: 'User already exist' } });
    }

    return res
      .status(422)
      .send({ error: { message: 'Could not process request' } });
  }
};
