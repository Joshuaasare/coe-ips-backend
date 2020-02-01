import { IRequestWithUser } from "../../../../_shared/middlewares";
import { Response } from "express";
import { updateEntityRecord } from "../../../../_shared/services";

export const deleteCompanyArchive = async (
  req: IRequestWithUser,
  res: Response
) => {
  try {
    const { dbInstance } = req;
    const ids = req.query.ids
      .split(",")
      .map((id: string) => [parseInt(id, 10)]);
    const query = `update company_archive set is_deleted = 1 where id = ?`;
    const lastDeleted = await updateEntityRecord(query, ids, dbInstance);
    return res.status(200).send({ data: lastDeleted });
  } catch (error) {
    console.log(`internal error`, error);
    return res.status(422).send({ error: "Could not process request" });
  }
};
