import { RequestWithDbConnection } from "../../../..";
import { Response } from "express";
import bcrypt from "bcryptjs";
import { constants, globals } from "../../../../_shared/globals";
import {
  getEntityRecordFromKey,
  insertEntityRecord
} from "../../../../_shared/services";

export const registerStudent = async (
  req: RequestWithDbConnection,
  res: Response
): Promise<any> => {
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
      yearOfStudy
    } = req.body.data;

    const hash = await bcrypt.hash(password, globals.SALT_ROUNDS);

    const locationData = [
      locationDetails.name,
      locationDetails.address,
      locationDetails.coords.lat,
      locationDetails.coords.lng,
      Date.parse(`${new Date()}`),
      Date.parse(`${new Date()}`)
    ];

    const userData = [
      constants.user_type_id.STUDENT,
      email,
      hash,
      Date.parse(`${new Date()}`),
      Date.parse(`${new Date()}`)
    ];

    const user = await getEntityRecordFromKey(
      "user",
      "email",
      [email],
      dbInstance
    );

    if (!(user.length === 0)) {
      res.status(409).send({ error: "User already exist" });
      return;
    }

    const insertedLocation = await insertEntityRecord(
      "location",
      "name, address,latitude, longitude,created_at, last_modified",
      "?,?,?,?,?,?",
      [locationData],
      dbInstance
    );

    const insertedUser = await insertEntityRecord(
      "user",
      "user_type_id, email,password,created_at, last_modified",
      "?,?,?,?,?",
      [userData],
      dbInstance
    );

    const studentData = [
      insertedUser.insertId,
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
      insertedLocation.insertId,
      haveCompany === 0 ? 1 : 0,
      Date.parse(`${new Date()}`),
      Date.parse(`${new Date()}`)
    ];

    const response = await insertEntityRecord(
      "student",
      "user_id,index_number,surname,other_names,main_department_id,sub_department_id,phone,email,year_of_study,acad_year,location,address,google_place_id,latitude,longitude,foreign_student,location_id,want_placement,created_at,last_modified",
      "?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?",
      [studentData],
      dbInstance
    );
    return res.status(200).send({ data: response });
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
