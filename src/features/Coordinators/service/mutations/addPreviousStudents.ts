import { Response } from 'express';
import { RequestWithUser } from '../../../../_shared/middlewares';
import { updateEntityRecord } from '../../../../_shared/services';

export const addPreviousStudents = async (
  req: RequestWithUser,
  res: Response
): Promise<Response> => {
  try {
    const { dbInstance } = req;
    const getStudentsQuery = `select * from student where acad_year = ?`;
    const students = await dbInstance.runPreparedSelectQuery(getStudentsQuery, [
      2017,
    ]);

    return (async function updateStudent(index: number): Promise<Response> {
      if (!students[index]) {
        return res.status(200).send({ data: 'successful' });
      }

      const currentStudent = students[index];

      const updateUserData = [currentStudent.email, currentStudent.user_id];
      const updateUserQuery = `update user set email = ? where id = ?`;

      await updateEntityRecord(updateUserQuery, [updateUserData], dbInstance);

      const getLocationQuery = `select * from location where id = ?`;
      const location = await dbInstance.runPreparedSelectQuery(
        getLocationQuery,
        [currentStudent.location_id]
      );

      const getMainDepartmentQuery = `select * from sub_department where id = ?`;
      const subDepartment = await dbInstance.runPreparedSelectQuery(
        getMainDepartmentQuery,
        [currentStudent.sub_department_id]
      );

      const updateStudentQuery = `update student set main_department_id = ?,location = ?, 
      address = ?,latitude = ?, longitude = ?, created_at = ? where user_id = ?`;

      const updateStudentData = [
        subDepartment[0].main_department_id,
        location[0].name,
        location[0].address,
        location[0].latitude,
        location[0].longitude,
        currentStudent.last_modified,
        currentStudent.user_id,
      ];

      await updateEntityRecord(
        updateStudentQuery,
        [updateStudentData],
        dbInstance
      );

      return updateStudent(++index);
    })(0);
  } catch (error) {
    return res.status(422).send({ error: 'Could not process request' });
  }
};
