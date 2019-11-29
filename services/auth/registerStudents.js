const saltRounds = 10;
const bcrypt = require("bcrypt");
const { checkEmailAddress } = require("./_helpers/authService");
const { postPreparedQuery } = require("../../models");
// const twilio = require('../../routes/twilio');

const registerStudentsService = async (req, next) => {
  const {
    surname,
    password,
    phone,
    department,
    email,
    foreignStudent,
    haveCompany,
    indexNumber,
    locationDetails,
    locationId,
    otherNames,
    programme,
    yearOfStudy
  } = req.body;
  const hash = await bcrypt.hash(password, saltRounds);
  const addStudentQuery = "insert into student set ?";
  const addUserQuery = "insert into user set ?";
  const addLocationQuery = "insert into location set ?";
  const checkEmailAddressQuery = `select * from user where email = ? `;

  const locationData = {
    name: locationDetails.name,
    address: locationDetails.address,
    latitude: locationDetails.coords.lat,
    longitude: locationDetails.coords.lng,
    created_at: Date.parse(new Date()),
    last_modified: Date.parse(new Date())
  };

  const userData = {
    user_type_id: 1,
    email,
    password: hash,
    created_at: Date.parse(new Date()),
    last_modified: Date.parse(new Date())
  };

  const emailExists = await checkEmailAddress(
    req,
    checkEmailAddressQuery,
    [email],
    next
  );

  if (emailExists) return { emailExists: true };
  const insertedLocation = await postPreparedQuery(
    req,
    addLocationQuery,
    locationData,
    next
  );

  const insertedUser = await postPreparedQuery(
    req,
    addUserQuery,
    userData,
    next
  );

  const studentData = {
    user_id: insertedUser.insertId,
    index_number: indexNumber,
    surname,
    other_names: otherNames,
    main_department_id: department,
    sub_department_id: programme,
    phone,
    email,
    year_of_study: yearOfStudy,
    acad_year: 2019,
    location: locationDetails.name,
    address: locationDetails.address,
    google_place_id: locationId,
    latitude: locationDetails.coords.lat,
    longitude: locationDetails.coords.lng,
    foreign_student: foreignStudent,
    location_id: insertedLocation.insertId,
    want_placement: haveCompany === 0 ? 1 : 0,
    created_at: Date.parse(new Date()),
    last_modified: Date.parse(new Date())
  };

  const response = await postPreparedQuery(
    req,
    addStudentQuery,
    studentData,
    next
  );
  return response;
};

module.exports = {
  registerStudentsService
};
