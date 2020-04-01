import { Response } from 'express';
import { RequestWithUser } from '../../../../_shared/middlewares';
import { getAllRecords } from '../../../../_shared/services';

export const getSubDepartments = async (
  req: RequestWithUser,
  res: Response
): Promise<Response> => {
  try {
    const { dbInstance } = req;
    const subDepartments = await getAllRecords(
      'sub_department',
      dbInstance,
      false
    );
    return res.status(200).send({ data: subDepartments });
  } catch (error) {
    return res.status(422).send({ error: 'Could not process request' });
  }
};
