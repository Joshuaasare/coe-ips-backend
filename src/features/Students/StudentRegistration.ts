import { Request, Response } from "express";
import { Database, PostRows } from "../../_shared/dbWrapper/Database";
import bcrypt from "bcryptjs";
import { checkIfUserExists } from "../../_shared/services";
import { RequestWithDbConnection } from "../..";

const saltRounds = 10;

export const registerStudent = async (
  req: RequestWithDbConnection,
  res: Response
): Promise<any> => {
  try {
    const dbInstance: Database = req.dbInstance;
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
      yearOfStudy
    } = req.body.data;

    const hash = await bcrypt.hash(password, saltRounds);
    const checkEmailAddressQuery = `select * from user where email = ?`;
    const addStudentQuery = "insert into student set ?";
    const addUserQuery = "insert into user set ?";
    const addLocationQuery = "insert into location set ?";

    const locationData = {
      name: locationDetails.name,
      address: locationDetails.address,
      latitude: locationDetails.coords.lat,
      longitude: locationDetails.coords.lng,
      created_at: Date.parse(`${new Date()}`),
      last_modified: Date.parse(`${new Date()}`)
    };

    const userData = {
      user_type_id: 1,
      email,
      password: hash,
      created_at: Date.parse(`${new Date()}`),
      last_modified: Date.parse(`${new Date()}`)
    };

    const emailExists = await checkIfUserExists(
      dbInstance,
      checkEmailAddressQuery,
      [email]
    );

    if (emailExists) {
      res.status(409).send({ error: "User already exist" });
      return;
    }

    const insertedLocation: PostRows = await dbInstance.runPostQuery(
      addLocationQuery,
      locationData
    );

    const insertedUser: PostRows = await dbInstance.runPostQuery(
      addUserQuery,
      userData
    );

    const studentData = {
      user_id: insertedUser.insertId,
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
      location_id: insertedLocation.insertId,
      want_placement: haveCompany === 0 ? 1 : 0,
      created_at: Date.parse(`${new Date()}`),
      last_modified: Date.parse(`${new Date()}`)
    };

    const response = await dbInstance.runPostQuery(
      addStudentQuery,
      studentData
    );

    res.status(200).send({ data: response });
    return;
  } catch (error) {
    console.error(`Internal error`);
    console.log(error.code);
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).send({ error: { message: "User already exist" } });
    }

    return res
      .status(422)
      .send({ error: { message: "Could not process request" } });
  }
};
