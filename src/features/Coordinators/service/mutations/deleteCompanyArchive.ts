import { Response } from 'express';
import { RequestWithUser } from '../../../../_shared/middlewares';
import { updateEntityRecord } from '../../../../_shared/services';

export const deleteCompanyArchive = async (
  req: RequestWithUser,
  res: Response
): Promise<Response> => {
  try {
    const { dbInstance } = req;
    const ids: number[][] = req.query.ids
      .split(',')
      .map((id: string) => [parseInt(id, 10)]);
    const query = `update company_archive set is_deleted = 1 where id = ?`;
    const lastDeleted = await updateEntityRecord(query, ids, dbInstance);
    return res.status(200).send({ data: lastDeleted });
  } catch (error) {
    return res.status(422).send({ error: 'Could not process request' });
  }
};
