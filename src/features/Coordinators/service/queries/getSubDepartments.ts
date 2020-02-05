import { IRequestWithUser } from "../../../../_shared/middlewares";
import { Response } from "express";
import { getAllRecords } from "../../../../_shared/services";

export const getSubDepartments = async (
  req: IRequestWithUser,
  res: Response
) => {
  try {
    const { dbInstance } = req;
    const subDepartments = await getAllRecords(
      "sub_department",
      dbInstance,
      false
    );
    return res.status(200).send({ data: subDepartments });
  } catch (error) {
    console.log(`internal error`, error);
    return res.status(422).send({ error: "Could not process request" });
  }
};
