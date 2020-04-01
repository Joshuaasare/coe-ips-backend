import { Response } from 'express';
import nodeMailer from 'nodemailer';
import { RequestWithUser } from '../../../../_shared/middlewares';
import {
  updateEntityRecord,
  getEntityRecordFromKey,
} from '../../../../_shared/services';
import { Database } from '../../../../_shared/dbWrapper/Database';
import { globals } from '../../../../_shared/globals';

export function setStudentCompany(
  data: Array<Array<boolean | string | number>>,
  dbInstance: Database,
  studentData,
  companyName: string,
  companyLocation: string,
  callback: (index: number) => {},
  index: number,
  companyChange = false
): void {
  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vacationtraining.knust.coe@gmail.com',
      pass: 'coe-vac-training-2019',
    },
  });

  updateEntityRecord(
    'update student set company_id = ?, internship_placement_date = ? where user_id = ?',
    data,
    dbInstance
  );

  const mailOptions = companyChange
    ? {
        from: 'knustcoeindustrialtraining@gmail.com', // sender address
        to: studentData[0].email, // list of receivers
        subject: 'Vacation Training Placement Change', // Subject line
        text:
          `Hello ${studentData[0].surname} ${studentData[0].other_names},` +
          '\n\nYour placement has been changed to' +
          `\n\n${companyName} - ${companyLocation}` +
          `\n\nfor vacation training in the ${globals.school.ACAD_YEAR}/${
            globals.school.ACAD_YEAR + 1
          } academic year. Kindly Login to the internship platform, ` +
          'print the acceptance letter and send it in person to your new company. ' +
          'Consult the internship guide on the platform or contact your coordinator if you have any questions',
      }
    : {
        from: 'knustcoeindustrialtraining@gmail.com', // sender address
        to: studentData[0].email, // list of receivers
        subject: 'Vacation Training Placement', // Subject line
        text:
          `Hello ${studentData[0].surname} ${studentData[0].other_names},` +
          '\n\nYou have been placed to' +
          `\n\n${companyName} - ${companyLocation}` +
          `\n\nfor vacation training in the ${globals.school.ACAD_YEAR}/${
            globals.school.ACAD_YEAR + 1
          } academic year. Kindly Login to the internship platform, ` +
          'print the acceptance letter and send it in person to your company. ' +
          'Consult the internship guide on the platform or contact your coordinator if you have any questions',
      };

  transporter.sendMail(mailOptions, async (err) => {
    if (err) {
      return callback(++index);
    }
    return callback(++index);
  });
}

export const updatePlacement = async (
  req: RequestWithUser,
  res: Response
): Promise<Response> => {
  try {
    const { dbInstance } = req;
    const { data } = req.body;

    return (async function runCompanyPlacement(
      index: number
    ): Promise<Response> {
      if (!data[index]) {
        return (async function runPlacementRemove(
          i: number
        ): Promise<Response> {
          if (!data[i]) {
            return res.status(200).send({ data: 'successful' });
          }

          const companyStudents = await dbInstance.runPreparedSelectQuery(
            'Select * from student where company_id = ? AND sub_department_id = ? AND acad_year =  ?',
            [
              data[i].companyId,
              data[i].subDepartmentId,
              globals.school.ACAD_YEAR,
            ]
          );

          const studentsToChange = (companyStudents as Record<
            string,
            string | number | boolean
          >[])
            .map((item) => item.user_id)
            .filter((stud) => !data[i].students.includes(stud))
            .map((stud) => [null, stud]);

          await updateEntityRecord(
            'update student set company_id = ? where user_id = ?',
            studentsToChange,
            dbInstance
          );
          return runPlacementRemove(++i);
        })(0);
      }

      const { companyId, companyName, students, companyLocation } = data[index];

      return (async function runStudentPlacement(i: number): Promise<Response> {
        const student = students[i];

        if (!student) {
          return runCompanyPlacement(++index);
        }

        const studentUpdateData = [
          [data[index].companyId, Date.parse(`${new Date()}`), student],
        ];
        const studentData = await getEntityRecordFromKey(
          'student',
          'user_id',
          [student],
          dbInstance
        );

        if (!studentData[0].company_id) {
          setStudentCompany(
            studentUpdateData,
            dbInstance,
            studentData,
            companyName,
            companyLocation,
            runStudentPlacement,
            i
          );
        }
        if (
          studentData[0].company_id &&
          studentData[0].company_id !== companyId
        ) {
          setStudentCompany(
            studentUpdateData,
            dbInstance,
            studentData,
            companyName,
            companyLocation,
            runStudentPlacement,
            i,
            true
          );
        }
        return runStudentPlacement(++i);
      })(0);
    })(0);
  } catch (error) {
    return res.status(422).send({ error: 'Could not process request' });
  }
};
