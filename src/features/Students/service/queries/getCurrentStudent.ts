import { Response } from 'express';
import { RequestWithUser } from '../../../../_shared/middlewares';

export const getCurrentStudent = async (
  req: RequestWithUser,
  res: Response
): Promise<Response> => {
  const { user, dbInstance } = req;
  try {
    const studentQuery = `student.user_id as student_user_id,
    student.index_number as student_index_number, 
    student.surname as student_surname, 
    student.other_names as student_other_names, 
    student.phone as student_phone, 
    student.email as student_email, 
    student.year_of_study as student_year_of_study,
    student.acad_year as student_acad_year, 
    student.address as student_address, 
    student.location as student_location,
    student.google_place_id as student_google_place_id,
    student.latitude as student_latitude,
    student.longitude as student_longitude,
    student.foreign_student as student_foreign_student,
    student.want_placement as student_want_placement,
    student.acceptance_letter_url as student_acceptance_letter_url,
    student.registered_company as student_registered_company,
    student.rejected_placement as student_rejected_placement,
    student.company_id as student_company_id,
    student.created_at as student_created_at,
    student.internship_placement_date as student_internship_placement_date,
    student.internship_start_date as student_internship_start_date,
    student.internship_evaluation_date as student_internship_evaluation_date,
    student.internship_completion_date as student_internship_completion_date,
    student.supervisor_name as student_supervisor_name,
    student.supervisor_contact as student_supervisor_contact,
    student.supervisor_email as student_supervisor_email`;

    const subDepartmentQuery = `sub_department.id as sub_department_id, 
    sub_department.name as sub_department_name`;

    const mainDepartmentQuery = `main_department.id as main_department_id,
    main_department.name as main_department_name`;

    // const locationQuery = `location.name as location_name,
    // location.address as location_address`;

    const companyLocationQuery = `location.id as company_location_id,
    location.name as company_location_name, 
    location.address as company_location_address,
    location.latitude as company_location_latitude,
    location.longitude as company_location_longitude`;

    const companyQuery = `company.name as company_name,
    company.email as company_email,
    company.postal_address as company_postal_address,
    company.phone as company_contact,
    company.location_id as company_location_id,
    company.website as company_website,
    company.representative_name as company_rep_name,
    company.representative_email as company_rep_email,
    company.representative_phone as company_rep_contact`;

    const join1 = `(sub_department inner join student on student.sub_department_id = sub_department.id)`;
    const join2 = `(main_department inner join ${join1} on main_department.id = sub_department.main_department_id)`;
    const join3 = `(company right join ${join2} on student.company_id = company.user_id)`;
    const join4 = `(location right join ${join3} on company.location_id = location.id)`;
    const condition = `student.user_id = ?`;

    const mainQuery = `select ${studentQuery}, ${subDepartmentQuery}, ${mainDepartmentQuery}, 
     ${companyLocationQuery}, ${companyQuery} from ${join4} where ${condition}`;

    const student = await dbInstance.runPreparedSelectQuery(mainQuery, [
      user.userId,
    ]);

    // const mainCompanyLocationQuery = `select ${companyLocationQuery} from location where id = ?`;

    // const companyLocation: Array<any> = await dbInstance.runPreparedSelectQuery(
    //   mainCompanyLocationQuery,
    //   [student[0].company_location_id]
    // );

    if ((student as Record<string, string | boolean | number>[]).length === 0) {
      return res.status(404).send({
        error: {
          message: 'Student name does not exist',
        },
      });
    }

    const data = {
      userId: student[0].student_user_id,
      indexNumber: student[0].student_index_number,
      surname: student[0].student_surname,
      otherNames: student[0].student_other_names,
      phone: student[0].student_phone,
      email: student[0].student_email,
      yearOfStudy: student[0].student_year_of_study,
      acadYear: student[0].student_acad_year,
      address: student[0].student_address,
      location: student[0].student_location,
      googlePlaceId: student[0].student_google_place_id,
      latitude: student[0].student_latitude,
      longitude: student[0].student_longitude,
      foreignStudent: student[0].student_foreign_student,
      wantPlacement: student[0].student_want_placement,
      acceptanceLetterUrl: student[0].student_acceptance_letter_url,
      registeredCompany: student[0].student_registered_company,
      rejectedPlacement: student[0].student_rejected_placement,
      supervisorName: student[0].student_supervisor_name,
      supervisorEmail: student[0].student_supervisor_email,
      supervisorContact: student[0].student_supervisor_contact,
      companyId: student[0].student_company_id,
      companyName: student[0].company_name,
      companyEmail: student[0].company_email,
      companyAddress: student[0].company_postal_address,
      companyContact: student[0].company_contact,
      companyWebsite: student[0].company_website,
      companyRepName: student[0].company_rep_name,
      companyRepContact: student[0].company_rep_contact,
      companyRepEmail: student[0].company_rep_email,
      companyLocationId: student[0].company_location_id,
      companyLocationName: student[0].company_location_name,
      companyLocationAddress: student[0].company_location_address,
      companyLocationLatitude: student[0].company_location_latitude,
      companyLocationLongitude: student[0].company_location_longitude,
      subDepartmentName: student[0].sub_department_name,
      mainDepartmentName: student[0].main_department_name,
      registrationDate: student[0].student_created_at,
      internshipPlacementDate: student[0].student_internship_placement_date,
      internshipStartDate: student[0].student_internship_start_date,
      internshipEvaluationDate: student[0].student_internship_evaluation_date,
      internshipCompletionDate: student[0].student_internship_completion_date,
    };

    return res.status(200).send({ data });
  } catch (error) {
    return res.status(422).send({ error: 'Could not process request' });
  }
};
