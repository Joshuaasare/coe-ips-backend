import { Response } from 'express';
import { RequestWithUser } from '../../../../_shared/middlewares';
import { updateEntityRecord, isEmpty } from '../../../../_shared/services';
import { globals } from '../../../../_shared/globals';

export const updateCompanyArchive = async (
  req: RequestWithUser,
  res: Response
): Promise<Response> => {
  try {
    const { dbInstance } = req;
    const {
      id,
      name,
      email,
      phone,
      postalAddress,
      requestLetterUrl,
    } = req.body.data;

    const compData = [
      name,
      phone,
      email,
      postalAddress,
      Date.parse(`${new Date()}`),
      id,
    ];

    const query1 = `update company_archive set name = ?, phone = ?, email = ?, postal_address = ?,
    last_modified = ? where id = ?`;

    await updateEntityRecord(query1, [compData], dbInstance);
    if (!isEmpty(requestLetterUrl)) {
      const compArchiveContactMadeData = [
        requestLetterUrl,
        Date.parse(`${new Date()}`),
        id,
        globals.school.ACAD_YEAR,
      ];
      const query2 = `update company_archive_contact_made set request_letter_url = ?,
      last_modified = ? where company_archive_id = ? and acad_year = ?`;
      await updateEntityRecord(
        query2,
        [compArchiveContactMadeData],
        dbInstance
      );
    }
    return res.status(200).send({ data: 'Successful' });
  } catch (error) {
    return res.status(422).send({ error: 'Could not process request' });
  }
};
