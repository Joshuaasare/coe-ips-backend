import { Request, Response } from "express";
import { Database } from "../../_shared/dbWrapper/Database";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { globals } from "../../_shared/globals";
import { IRequestWithUser } from "../../_shared/middlewares";
import {
  getEntityRecordFromKey,
  updateEntityRecord
} from "../../_shared/services";

export const verifyUser = async (
  req: IRequestWithUser,
  res: Response
): Promise<any> => {
  try {
    const dbInstance: Database = req.dbInstance;
    const {
      email,
      password,
      userTypeId
    }: {
      email: string;
      password: string;
      userTypeId: number;
    } = req.body.data;
    const query = `select * from user where email = ? AND user_type_id = ?`;
    const user: Array<any> = await dbInstance.runPreparedSelectQuery(query, [
      email,
      userTypeId
    ]);
    if (user.length === 0) {
      return res.status(404).send({
        error: {
          message: "User name does not exist"
        }
      });
    }
    const isPasswordMatch: boolean = await bcrypt.compare(
      password,
      user[0].password
    );
    if (!isPasswordMatch) {
      return res.status(401).send({
        error: {
          message: "Password is incorrect"
        }
      });
    }

    const userQuery = `user.id as user_id, user.email as user_email`;
    const userTypeQuery = `user_type.id as user_type_id, user_type.name as user_type_name`;

    const join =
      "user_type inner join user on user_type.id = user.user_type_id";
    const condition = `user.id = ?`;
    const mainUserQuery = `select ${userQuery}, ${userTypeQuery} from ${join} where ${condition} `;

    const data = await dbInstance.runPreparedSelectQuery(mainUserQuery, [
      user[0].id
    ]);

    const payload = {
      userId: data[0].user_id,
      userType: data[0].user_type_name,
      userTypeId: data[0].user_type_id
    };

    const token = jwt.sign(payload, globals.JWT_SECRET_KEY);

    const userDetails: any = {
      userId: data[0].user_id,
      email: data[0].user_email,
      userTypeId: data[0].user_type_id,
      userTypeName: data[0].user_type_name,
      authToken: token
    };

    switch (userDetails.userTypeId) {
      case 1:
        //student
        const studentQuery = `student.index_number as student_index_number, 
        student.surname as student_surname, 
        student.other_names as student_other_names, 
        student.phone as student_phone, 
        student.email as student_email, 
        student.year_of_study as student_year_of_study,
        student.acad_year as student_acad_year, 
        student.address as student_address, 
        student.google_place_id as student_google_place_id`;

        const subDepartmentQuery = `sub_department.id as sub_department_id, 
        sub_department.name as sub_department_name`;

        const mainDepartmentQuery = `main_department.id as main_department_id,
        main_department.name as main_department_name`;

        const join1 = `(student inner join sub_department on student.sub_department_id = sub_department.id)`;
        const join2 = `(main_department inner join ${join1} on sub_department.main_department_id = main_department.id)`;
        const condition = `student.user_id = ?`;

        const mainStudentQuery = `select ${studentQuery}, ${subDepartmentQuery}, ${mainDepartmentQuery} from ${join2} where ${condition}`;
        const student = await dbInstance.runPreparedSelectQuery(
          mainStudentQuery,
          [userDetails.userId]
        );

        userDetails.otherNames = student[0].student_other_names;
        userDetails.lastName = student[0].student_surname;
        userDetails.indexNumber = student[0].student_index_number;
        userDetails.yearOfStudy = student[0].student_year_of_study;
        userDetails.acadYear = student[0].student_acad_year;
        userDetails.address = student[0].student_address;
        userDetails.mainDepartment = student[0].main_department_name;
        userDetails.subDepartment = student[0].sub_department_name;

        break;
      default:
        break;
    }
    return res.status(200).send({ data: userDetails });
  } catch (error) {
    console.error(`Internal error`);
    console.log(error);
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).send({ error: "User already exist" });
    }

    return res.status(422).send({ error: "Could not process request" });
  }
};

export const verifyWithToken = async (req: IRequestWithUser, res: Response) => {
  return res.status(200).send({ data: req.user });
};

export const resetPassword = async (req: IRequestWithUser, res: Response) => {
  try {
    const { email, newPassword } = req.body.data;
    const { dbInstance } = req;

    const user = await getEntityRecordFromKey(
      "user",
      "email",
      [email],
      dbInstance
    );
    if (!user.length) {
      return res.status(404).send({ error: { message: "user not found" } });
    }

    const hash = await bcrypt.hash(newPassword, globals.SALT_ROUNDS);
    const userData = [hash, Date.parse(`${new Date()}`), email];
    const updatePasswordQuery = `update user set password = ?, last_modified = ? where email = ?`;
    await updateEntityRecord(updatePasswordQuery, [userData], dbInstance);
    return res.status(200).send({ data: "successful" });
  } catch (error) {
    return res.status(422).send({ error: "Could not process request" });
  }
};
