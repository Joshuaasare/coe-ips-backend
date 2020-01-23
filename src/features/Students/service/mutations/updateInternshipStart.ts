import { IRequestWithUser } from "../../../../_shared/middlewares";
import { Response } from "express";
import { updateEntityRecord } from "../../../../_shared/services";

export const updateInternshipStart = async (
  req: IRequestWithUser,
  res: Response
) => {
  try {
    const { dbInstance, user } = req;
    const studentData = [Date.parse(`${new Date()}`), user.userId];
    const updateStudentQuery = `update student set internship_start_date
     = ? where user_id = ?`;

    const updatedStudent = await updateEntityRecord(
      updateStudentQuery,
      [studentData],
      dbInstance
    );

    return res.status(200).send({ data: "successful" });
  } catch (error) {
    console.log(`internal error`, error);
    return res.status(422).send({ error: "Could not process request" });
  }
};
