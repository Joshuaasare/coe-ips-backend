import { Response } from "express";
import { Database, PostRows } from "../../_shared/dbWrapper/Database";
import bcrypt from "bcryptjs";
import { IRequestWithUser } from "../../_shared/middlewares";

const saltRounds = 10;

export const getCurrentStudent = async (
  req: IRequestWithUser,
  res: Response
): Promise<any> => {
  const dbInstance: Database = req.dbInstance;
  const { user } = req;
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

    const locationQuery = `location.name as location_name, 
    location.address as location_address`;

    const companyQuery = `company.name as company_name,
    company.email as company_email,
    company.postal_address as company_postal_address,
    company.phone as company_contact,
    company.location_id as company_location_id,
    company.website as company_website,
    company.representative_name as company_rep_name,
    company.representative_email as company_rep_email,
    company.representative_phone as company_rep_contact`;

    const join1 = `(student inner join location on student.location_id = location.id)`;
    const join2 = `(sub_department inner join ${join1} on student.sub_department_id = sub_department.id)`;
    const join3 = `(main_department inner join ${join2} on main_department.id = sub_department.main_department_id)`;
    const join4 = `(company right join ${join3} on student.company_id = company.user_id)`;
    const condition = `student.user_id = ?`;

    const mainQuery = `select ${studentQuery}, ${subDepartmentQuery}, ${mainDepartmentQuery}, 
     ${locationQuery}, ${companyQuery} from ${join4} where ${condition}`;

    const student: Array<any> = await dbInstance.runPreparedSelectQuery(
      mainQuery,
      [user.userId]
    );

    const companyLocationQuery = `location.name as location_name, 
    location.address as location_address,
    location.latitude as location_latitude,
    location.longitude as location_longitude`;

    const mainCompanyLocationQuery = `select ${companyLocationQuery} from location where id = ?`;

    const companyLocation: Array<any> = await dbInstance.runPreparedSelectQuery(
      mainCompanyLocationQuery,
      [student[0].company_location_id]
    );

    console.log(student);

    if (student.length === 0) {
      return res.status(404).send({
        error: {
          message: "Student name does not exist"
        }
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
      companyLocationName: companyLocation[0].location_name,
      companyLocationAddress: companyLocation[0].location_address,
      companyLocationLatitude: companyLocation[0].location_latitude,
      companyLocationLongitude: companyLocation[0].location_longitude,
      subDepartmentName: student[0].sub_department_name,
      mainDepartmentName: student[0].main_department_name,
      registrationDate: student[0].student_created_at,
      internshipPlacementDate: student[0].student_internship_placement_date,
      internshipStartDate: student[0].student_internship_start_date,
      internshipEvaluationDate: student[0].student_internship_evaluation_date,
      internshipCompletionDate: student[0].student_internship_completion_date
    };

    return res.status(200).send({ data });
  } catch (error) {
    console.log(`internal error`, error);

    return res.status(422).send({ error: "Could not process request" });
  }
};

export const addStudentCompany = async (
  req: IRequestWithUser,
  res: Response
) => {
  try {
    const { user, dbInstance } = req;
    console.log(req.body);
    const {
      name,
      email,
      contact,
      address,
      repName,
      repContact,
      repEmail,
      locationId,
      acceptanceLetterUrl,
      locationDetails,
      website
    } = req.body.data;

    const hash = await bcrypt.hash(contact, saltRounds);

    const addLocationQuery = "insert into location set ?";
    const addUserQuery = "insert into user set ?";
    const addCompanyQuery = "insert into company set ?";
    const updateStudentQuery = `update student set acceptance_letter_url = ?, 
    internship_placement_date = ?, registered_company = ?, want_placement = ?, 
    company_id = ?, last_modified = ?`;

    const locationData = {
      name: locationDetails.name,
      address: locationDetails.address,
      latitude: locationDetails.coords.lat,
      longitude: locationDetails.coords.lng,
      created_at: Date.parse(`${new Date()}`),
      last_modified: Date.parse(`${new Date()}`)
    };

    const userData = {
      user_type_id: 1,
      email,
      password: hash,
      created_at: Date.parse(`${new Date()}`),
      last_modified: Date.parse(`${new Date()}`)
    };

    const insertedLocation: PostRows = await dbInstance.runPostQuery(
      addLocationQuery,
      locationData
    );

    const insertedUser: PostRows = await dbInstance.runPostQuery(
      addUserQuery,
      userData
    );

    const companyData = {
      user_id: insertedUser.insertId,
      name,
      email,
      phone: contact,
      location_id: insertedLocation.insertId,
      postal_address: address,
      website,
      representative_name: repName,
      representative_phone: repContact,
      representative_email: repEmail,
      created_at: Date.parse(`${new Date()}`)
    };

    const insertedCompany: PostRows = await dbInstance.runPostQuery(
      addCompanyQuery,
      companyData
    );

    const updatedStudentData = [
      acceptanceLetterUrl,
      Date.parse(`${new Date()}`),
      true,
      false,
      insertedUser.insertId,
      Date.parse(`${new Date()}`)
    ];

    const rows = await dbInstance.runPreparedQuery(updateStudentQuery, [
      updatedStudentData
    ]);

    return res.status(200).send({ data: "Successful" });
  } catch (error) {
    console.log(`internal error`, error);

    return res.status(422).send({ error: "Could not process request" });
  }
};

export const getAllStudents = async (
  req: IRequestWithUser,
  res: Response
): Promise<any> => {
  const dbInstance: Database = new Database();
};

export const updateSingleStudent = async (
  req: IRequestWithUser,
  res: Response
): Promise<any> => {
  const dbInstance: Database = new Database();
  const { user } = req;
};

export const deleteSingleStudent = async (
  req: IRequestWithUser,
  res: Response
): Promise<any> => {
  const dbInstance: Database = new Database();
  const { user } = req;
};
