import { Response } from 'express';
import nodeMailer from 'nodemailer';
import { RequestWithUser } from '../../../../_shared/middlewares';
import { updateEntityRecord, isEmpty } from '../../../../_shared/services';
import { globals } from '../../../../_shared/globals';

export const sendPlacementRequest = async (
  req: RequestWithUser,
  res: Response
): Promise<Response> => {
  try {
    const { dbInstance } = req;
    const { ids } = req.body.data;

    const transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'vacationtraining.kust.coe@gmail.com',
        pass: 'coe-vac-training-2019',
      },
    });

    return (async function sendMail(index: number): Promise<Response> {
      if (!ids[index]) {
        return res.status(200).send({ data: 'successful' });
      }

      const id = ids[index];
      const companyArchiveQuery = `company_archive.email`;
      const contactMadeQuery = `company_archive_contact_made.contact_made as contact_made,
      company_archive_contact_made.acad_year as acad_year,
      company_archive_contact_made.request_letter_url as request_letter_url`;

      const join1 = `(company_archive inner join company_archive_contact_made on 
      company_archive.id = company_archive_contact_made.company_archive_id)`;

      const condition = `acad_year = ? AND company_archive_id = ?`;

      const mainQuery = `select ${contactMadeQuery}, ${companyArchiveQuery} from ${join1} where ${condition}`;

      const company = await dbInstance.runPreparedSelectQuery(mainQuery, [
        globals.school.ACAD_YEAR,
        id,
      ]);

      if (
        company[0].contact_made === 0 &&
        !isEmpty(company[0].request_letter_url) &&
        !isEmpty(company[0].email)
      ) {
        const code = Math.floor(Math.random() * 8999 + 1000);
        const mailOptions = {
          from: 'knustcoeindustrialtraining@gmail.com', // sender address
          to: company[0].email, // list of receivers
          subject: 'Industrial Training Request Letter', // Subject line
          text: `${
            'Ing. Prof. Prince Yaw Andoh, PhD, MGhIE' +
            '\nAssociate Professor/Industrial Liaison' +
            '\nDepartment of Mechanical Engineering' +
            '\nCollege of Engineering' +
            '\nKwame Nkrumah University of Science and Technology' +
            '\nPrivate Mail Bag, University Post Office Kumasi, Ghana' +
            '\nTel: 024 2235674; 020 0960067; 0507970658\n\n' +
            'Please Visit "coeips.netlify.com" to register and select the number of students for each department needed\n' +
            'Use '
          }${code} as verification code to upload`,

          attachments: [
            {
              filename: 'Placement Request Letter.pdf',
              path: company[0].request_letter_url,
            },
          ],
        };

        transporter.sendMail(mailOptions, async (err) => {
          if (err) {
            return sendMail(++index);
          }
          const data = [code, id, globals.school.ACAD_YEAR];
          const query = `update company_archive_contact_made set contact_made = 1 , code = ? where company_archive_id = ? AND acad_year = ?`;
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

/**
Ing. Prof. P. Y. Andoh, PhD; MGhIE
Associate Professor/Industrial Liaison
Department of Mechanical Engineering
College of Engineering
Kwame Nkrumah University Of Science and Technology
Private Mail Bag, University Post Office Kumasi, Ghana  
Tel: 024 2235674; 020 0960067; 050 7970658
 */
