import { IRequestWithUser } from "../../../../_shared/middlewares";
import { Response } from "express";
import { globals } from "../../../../_shared/globals";

export const getCompanyStudents = async (
  req: IRequestWithUser,
  res: Response
) => {
  try {
    const { user, dbInstance } = req;
    console.log("query", req.query);
    const companyId = req.query.id;

    const studentQuery = `student.user_id, student.index_number,student.surname, 
    student.other_names, student.phone, student.email, student.year_of_study,
    student.acad_year, student.address , student.location ,student.google_place_id ,
    student.latitude ,student.longitude ,student.foreign_student, student.want_placement,
    student.acceptance_letter_url, student.registered_company,student.rejected_placement,
    student.company_id, student.created_at,student.internship_placement_date ,
    student.internship_start_date, student.internship_evaluation_date,student.internship_completion_date,
    student.supervisor_name, student.supervisor_contact,student.supervisor_email`;

    const locationQuery = `location.id as location_id, location.name as location_name,
    location.address as location_address, location.district, location.region,
    location.latitude as lat, location.longitude as lng`;

    const subDepartmentQuery = `sub_department.id as sub_department_id, 
    sub_department.name as sub_department_name`;

    const mainDepartmentQuery = `main_department.id as main_department_id,
    main_department.name as main_department_name`;

    // const myCondition = `student.user_id != 1820 AND student.user_id != 1821 AND student.user_id != 1822 AND student.user_id != 1823`;

    const join1 = `(sub_department inner join student on student.sub_department_id = sub_department.id)`;
    const join2 = `(main_department inner join ${join1} on main_department.id = sub_department.main_department_id)`;
    const join3 = `(location inner join ${join2} on student.location_id = location.id)`;
    const condition = `student.acad_year = ? AND student.company_id = ? `;

    const mainQuery = `select ${studentQuery}, ${subDepartmentQuery}, ${mainDepartmentQuery}, ${locationQuery}
     from ${join3} where ${condition}`;

    const students: Array<any> = await dbInstance.runPreparedSelectQuery(
      mainQuery,
      [globals.school.ACAD_YEAR, companyId]
    );

    return res.status(200).send({ data: students });
  } catch (error) {
    console.log(`internal error`, error);
    return res.status(422).send({ error: "Could not process request" });
  }
};
