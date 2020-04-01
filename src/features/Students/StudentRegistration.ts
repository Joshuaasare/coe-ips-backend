/* eslint-disable @typescript-eslint/camelcase */
import { Response } from 'express';
import bcrypt from 'bcryptjs';
import { PostRows } from '../../_shared/dbWrapper/Database';
import { checkIfUserExists } from '../../_shared/services';
import { RequestWithDbConnection } from '../..';

const saltRounds = 10;

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

    const hash = await bcrypt.hash(password, saltRounds);
    const checkEmailAddressQuery = `select * from user where email = ?`;
    const addStudentQuery = 'insert into student set ?';
    const addUserQuery = 'insert into user set ?';
    const addLocationQuery = 'insert into location set ?';

    const locationData = {
      name: locationDetails.name,
      address: locationDetails.address,
      latitude: locationDetails.coords.lat,
      longitude: locationDetails.coords.lng,
      created_at: Date.parse(`${new Date()}`),
      last_modified: Date.parse(`${new Date()}`),
    };

    const userData = {
      user_type_id: 1,
      email,
      password: hash,
      created_at: Date.parse(`${new Date()}`),
      last_modified: Date.parse(`${new Date()}`),
    };

    const emailExists = await checkIfUserExists(
      dbInstance,
      checkEmailAddressQuery,
      [email]
    );

    if (emailExists) {
      return res.status(409).send({ error: 'User already exist' });
    }

    const insertedLocation = await dbInstance.runPostQuery(
      addLocationQuery,
      locationData
    );

    const insertedUser = await dbInstance.runPostQuery(addUserQuery, userData);

    const studentData = {
      user_id: (insertedUser as PostRows).insertId,
      index_number: indexNumber,
      surname,
      other_names: otherNames,
      main_department_id: department,
      sub_department_id: programme,
      phone,
      email,
      year_of_study: yearOfStudy,
      acad_year: 2019,
      location: locationDetails.name,
      address: locationDetails.address,
      google_place_id: locationId,
      latitude: locationDetails.coords.lat,
      longitude: locationDetails.coords.lng,
      foreign_student: foreignStudent,
      location_id: (insertedLocation as PostRows).insertId,
      want_placement: haveCompany === 0 ? 1 : 0,
      created_at: Date.parse(`${new Date()}`),
      last_modified: Date.parse(`${new Date()}`),
    };

    const response = await dbInstance.runPostQuery(
      addStudentQuery,
      studentData
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
