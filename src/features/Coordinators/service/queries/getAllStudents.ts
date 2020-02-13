import { IRequestWithUser } from "../../../../_shared/middlewares";
import { Response } from "express";
import { globals } from "../../../../_shared/globals";

export const getAllStudents = async (req: IRequestWithUser, res: Response) => {
  try {
    const { dbInstance } = req;
    const studentQuery = `student.user_id, student.index_number,student.surname, 
    student.other_names, student.phone, student.email, student.year_of_study,
    student.acad_year, student.address , student.location ,student.google_place_id ,
    student.latitude ,student.longitude ,student.foreign_student, student.want_placement,
    student.acceptance_letter_url, student.registered_company,student.rejected_placement,
    student.company_id, student.created_at,student.internship_placement_date ,
    student.internship_start_date, student.internship_evaluation_date,student.internship_completion_date,
    student.supervisor_name, student.supervisor_contact,student.supervisor_email`;

    const subDepartmentQuery = `sub_department.id as sub_department_id, 
    sub_department.name as sub_department_name`;

    const mainDepartmentQuery = `main_department.id as main_department_id,
    main_department.name as main_department_name`;

    const join1 = `(sub_department inner join student on student.sub_department_id = sub_department.id)`;
    const join2 = `(main_department inner join ${join1} on main_department.id = sub_department.main_department_id)`;
    const condition = `student.acad_year = ? `;

    const mainQuery = `select ${studentQuery}, ${subDepartmentQuery}, ${mainDepartmentQuery}
     from ${join2} where ${condition}`;

    const students: Array<any> = await dbInstance.runPreparedSelectQuery(
      mainQuery,
      [globals.school.ACAD_YEAR]
    );

    return res.status(200).send({ data: students });
  } catch (error) {
    console.log(`internal error`, error);
    return res.status(422).send({ error: "Could not process request" });
  }
};
