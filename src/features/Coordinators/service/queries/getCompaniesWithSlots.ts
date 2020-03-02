import { IRequestWithUser } from "../../../../_shared/middlewares";
import { Response } from "express";
import { getAllRecords } from "../../../../_shared/services";
import forEach from "lodash/forEach";
import { globals } from "../../../../_shared/globals";

export const getCompaniesWithSlots = async (
  req: IRequestWithUser,
  res: Response
) => {
  try {
    const { dbInstance } = req;
    const companyQuery = `company.user_id as company_id,
    company.name as name`;

    const companySubDepartmentQuery = `company_sub_department.id as company_sub_department_id,
    company_sub_department.number_needed`;

    const subDepartmentQuery = `sub_department.id as sub_department_id, 
    sub_department.name as sub_department_name`;

    const mainDepartmentQuery = `main_department.id as main_department_id,
    main_department.name as main_department_name`;

    const locationQuery = `location.id as location_id, location.name as location_name,
    location.address as location_address, location.district, location.region,
    location.latitude as lat, location.longitude as lng`;

    const join1 = `(company inner join company_sub_department on company.user_id = company_sub_department.company_id)`;
    const join2 = `(sub_department inner join ${join1} on sub_department.id = company_sub_department.sub_department_id)`;
    const join3 = `(main_department inner join ${join2} on sub_department.main_department_id = main_department.id)`;
    const join4 = `(location inner join ${join3} on company.location_id = location.id)`;

    const condition = `company_sub_department.acad_year = ?`;

    const mainQuery = `select ${companyQuery}, ${companySubDepartmentQuery}, ${subDepartmentQuery}, 
    ${mainDepartmentQuery}, ${locationQuery} from ${join4} where ${condition}`;

    const companies = await dbInstance.runPreparedSelectQuery(mainQuery, [
      globals.school.ACAD_YEAR
    ]);

    (async function getPlacedStudents(index: number) {
      if (!companies[index]) {
        return res.status(200).send({ data: companies });
      }
      const studentsQuery = `select * from student where company_id = ? AND sub_department_id = ? AND acad_year = ?`;
      const studentData = [
        companies[index].company_id,
        companies[index].sub_department_id,
        globals.school.ACAD_YEAR
      ];
      const students = await dbInstance.runPreparedSelectQuery(
        studentsQuery,
        studentData
      );

      const studentOptionData = [
        companies[index].sub_department_id,
        globals.school.ACAD_YEAR
      ];

      const studentOptionQuery = `select * from student where sub_department_id = ? AND acad_year = ?`;
      const studentOptions = await dbInstance.runPreparedSelectQuery(
        studentOptionQuery,
        studentOptionData
      );

      companies[index].students = students;
      companies[index].student_options = studentOptions;
      getPlacedStudents(++index);
    })(0);
  } catch (error) {
    console.log(`internal error`, error);
    return res.status(422).send({ error: "Could not process request" });
  }
};
