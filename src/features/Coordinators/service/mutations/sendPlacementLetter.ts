import { Response } from 'express';
import nodeMailer from 'nodemailer';
import { RequestWithUser } from '../../../../_shared/middlewares';
import { globals } from '../../../../_shared/globals';
import { isEmpty, updateEntityRecord } from '../../../../_shared/services';

export const sendPlacementLetter = async (
  req: RequestWithUser,
  res: Response
): Promise<Response> => {
  try {
    const { dbInstance } = req;
    const { ids } = req.body.data;
    const transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'vacationtraining.knust.coe@gmail.com',
        pass: 'coe-vac-training-2019',
      },
    });

    return (async function sendMail(index: number): Promise<Response> {
      if (!ids[index]) {
        return res.status(200).send({ data: 'successful' });
      }

      const id = ids[index];

      const mainQuery = `select * from company where user_id = ?`;

      const company = await dbInstance.runPreparedSelectQuery(mainQuery, [id]);

      if (
        company[0].placement_letter_sent === 0 &&
        !isEmpty(company[0].placement_letter_url) &&
        !isEmpty(company[0].email)
      ) {
        const mailOptions = {
          from: 'knustcoeindustrialtraining@gmail.com', // sender address
          to: company[0].email, // list of receivers
          subject: 'Industrial Training Placement List', // Subject line
          text:
            'Please find attached to this mail a letter containing the list of all students posted to your company' +
            '\n\nIng. Prof. Prince Yaw Andoh, PhD, MGhIE' +
            '\nAssociate Professor/Industrial Liaison' +
            '\nDepartment of Mechanical Engineering' +
            '\nCollege of Engineering' +
            '\nKwame Nkrumah University of Science and Technology' +
            '\nPrivate Mail Bag, University Post Office Kumasi, Ghana' +
            '\nTel: 024 2235674; 020 0960067; 0507970658\n\n',

          attachments: [
            {
              filename: 'Placement list letter.pdf',
              path: company[0].placement_letter_url,
            },
          ],
        };

        transporter.sendMail(mailOptions, async (err) => {
          if (err) {
            return sendMail(++index);
          }
          const data = [id, globals.school.ACAD_YEAR];
          const query = `update company set placement_letter_sent = 1 where user_id = ? AND acad_year = ?`;
          await updateEntityRecord(query, [data], dbInstance);
          return sendMail(++index);
        });
      }
      return sendMail(++index);
    })(0);
  } catch (error) {
    return res.status(422).send({ error: 'Could not process request' });
  }
};
