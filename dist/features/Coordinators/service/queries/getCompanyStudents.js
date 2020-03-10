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
var globals_1 = require("../../../../_shared/globals");
exports.getCompanyStudents = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, dbInstance, companyId, studentQuery, locationQuery, subDepartmentQuery, mainDepartmentQuery, join1, join2, join3, condition, mainQuery, students, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = req.user, dbInstance = req.dbInstance;
                console.log("query", req.query);
                companyId = req.query.id;
                studentQuery = "student.user_id, student.index_number,student.surname, \n    student.other_names, student.phone, student.email, student.year_of_study,\n    student.acad_year, student.address , student.location ,student.google_place_id ,\n    student.latitude ,student.longitude ,student.foreign_student, student.want_placement,\n    student.acceptance_letter_url, student.registered_company,student.rejected_placement,\n    student.company_id, student.created_at,student.internship_placement_date ,\n    student.internship_start_date, student.internship_evaluation_date,student.internship_completion_date,\n    student.supervisor_name, student.supervisor_contact,student.supervisor_email";
                locationQuery = "location.id as location_id, location.name as location_name,\n    location.address as location_address, location.district, location.region,\n    location.latitude as lat, location.longitude as lng";
                subDepartmentQuery = "sub_department.id as sub_department_id, \n    sub_department.name as sub_department_name";
                mainDepartmentQuery = "main_department.id as main_department_id,\n    main_department.name as main_department_name";
                join1 = "(sub_department inner join student on student.sub_department_id = sub_department.id)";
                join2 = "(main_department inner join " + join1 + " on main_department.id = sub_department.main_department_id)";
                join3 = "(location inner join " + join2 + " on student.location_id = location.id)";
                condition = "student.acad_year = ? AND student.company_id = ? ";
                mainQuery = "select " + studentQuery + ", " + subDepartmentQuery + ", " + mainDepartmentQuery + ", " + locationQuery + "\n     from " + join3 + " where " + condition;
                return [4 /*yield*/, dbInstance.runPreparedSelectQuery(mainQuery, [globals_1.globals.school.ACAD_YEAR, companyId])];
            case 1:
                students = _a.sent();
                return [2 /*return*/, res.status(200).send({ data: students })];
            case 2:
                error_1 = _a.sent();
                console.log("internal error", error_1);
                return [2 /*return*/, res.status(422).send({ error: "Could not process request" })];
            case 3: return [2 /*return*/];
        }
    });
}); };
