"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentStudent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, dbInstance, studentQuery, subDepartmentQuery, mainDepartmentQuery, locationQuery, companyLocationQuery, companyQuery, join1, join2, join3, join4, condition, mainQuery, student, data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user, dbInstance = req.dbInstance;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                studentQuery = "student.user_id as student_user_id,\n    student.index_number as student_index_number, \n    student.surname as student_surname, \n    student.other_names as student_other_names, \n    student.phone as student_phone, \n    student.email as student_email, \n    student.year_of_study as student_year_of_study,\n    student.acad_year as student_acad_year, \n    student.address as student_address, \n    student.location as student_location,\n    student.google_place_id as student_google_place_id,\n    student.latitude as student_latitude,\n    student.longitude as student_longitude,\n    student.foreign_student as student_foreign_student,\n    student.want_placement as student_want_placement,\n    student.acceptance_letter_url as student_acceptance_letter_url,\n    student.registered_company as student_registered_company,\n    student.rejected_placement as student_rejected_placement,\n    student.company_id as student_company_id,\n    student.created_at as student_created_at,\n    student.internship_placement_date as student_internship_placement_date,\n    student.internship_start_date as student_internship_start_date,\n    student.internship_evaluation_date as student_internship_evaluation_date,\n    student.internship_completion_date as student_internship_completion_date,\n    student.supervisor_name as student_supervisor_name,\n    student.supervisor_contact as student_supervisor_contact,\n    student.supervisor_email as student_supervisor_email";
                subDepartmentQuery = "sub_department.id as sub_department_id, \n    sub_department.name as sub_department_name";
                mainDepartmentQuery = "main_department.id as main_department_id,\n    main_department.name as main_department_name";
                locationQuery = "location.name as location_name, \n    location.address as location_address";
                companyLocationQuery = "location.id as company_location_id,\n    location.name as company_location_name, \n    location.address as company_location_address,\n    location.latitude as company_location_latitude,\n    location.longitude as company_location_longitude";
                companyQuery = "company.name as company_name,\n    company.email as company_email,\n    company.postal_address as company_postal_address,\n    company.phone as company_contact,\n    company.location_id as company_location_id,\n    company.website as company_website,\n    company.representative_name as company_rep_name,\n    company.representative_email as company_rep_email,\n    company.representative_phone as company_rep_contact";
                join1 = "(sub_department inner join student on student.sub_department_id = sub_department.id)";
                join2 = "(main_department inner join " + join1 + " on main_department.id = sub_department.main_department_id)";
                join3 = "(company right join " + join2 + " on student.company_id = company.user_id)";
                join4 = "(location right join " + join3 + " on company.location_id = location.id)";
                condition = "student.user_id = ?";
                mainQuery = "select " + studentQuery + ", " + subDepartmentQuery + ", " + mainDepartmentQuery + ", \n     " + companyLocationQuery + ", " + companyQuery + " from " + join4 + " where " + condition;
                return [4 /*yield*/, dbInstance.runPreparedSelectQuery(mainQuery, [user.userId])];
            case 2:
                student = _a.sent();
                // const mainCompanyLocationQuery = `select ${companyLocationQuery} from location where id = ?`;
                // const companyLocation: Array<any> = await dbInstance.runPreparedSelectQuery(
                //   mainCompanyLocationQuery,
                //   [student[0].company_location_id]
                // );
                console.log("student in new", student);
                if (student.length === 0) {
                    return [2 /*return*/, res.status(404).send({
                            error: {
                                message: "Student name does not exist"
                            }
                        })];
                }
                data = {
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
                    internshipCompletionDate: student[0].student_internship_completion_date
                };
                return [2 /*return*/, res.status(200).send({ data: data })];
            case 3:
                error_1 = _a.sent();
                console.log("internal error", error_1);
                return [2 /*return*/, res.status(422).send({ error: "Could not process request" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
