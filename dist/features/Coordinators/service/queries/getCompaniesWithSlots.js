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
exports.getCompaniesWithSlots = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dbInstance_1, companyQuery, companySubDepartmentQuery, subDepartmentQuery, mainDepartmentQuery, locationQuery, join1, join2, join3, join4, condition, mainQuery, companies_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                dbInstance_1 = req.dbInstance;
                companyQuery = "company.user_id as company_id,\n    company.name as name";
                companySubDepartmentQuery = "company_sub_department.id as company_sub_department_id,\n    company_sub_department.number_needed";
                subDepartmentQuery = "sub_department.id as sub_department_id, \n    sub_department.name as sub_department_name";
                mainDepartmentQuery = "main_department.id as main_department_id,\n    main_department.name as main_department_name";
                locationQuery = "location.id as location_id, location.name as location_name,\n    location.address as location_address, location.district, location.region,\n    location.latitude as lat, location.longitude as lng";
                join1 = "(company inner join company_sub_department on company.user_id = company_sub_department.company_id)";
                join2 = "(sub_department inner join " + join1 + " on sub_department.id = company_sub_department.sub_department_id)";
                join3 = "(main_department inner join " + join2 + " on sub_department.main_department_id = main_department.id)";
                join4 = "(location inner join " + join3 + " on company.location_id = location.id)";
                condition = "company_sub_department.acad_year = ?";
                mainQuery = "select " + companyQuery + ", " + companySubDepartmentQuery + ", " + subDepartmentQuery + ", \n    " + mainDepartmentQuery + ", " + locationQuery + " from " + join4 + " where " + condition;
                return [4 /*yield*/, dbInstance_1.runPreparedSelectQuery(mainQuery, [
                        globals_1.globals.school.ACAD_YEAR
                    ])];
            case 1:
                companies_1 = _a.sent();
                (function getPlacedStudents(index) {
                    return __awaiter(this, void 0, void 0, function () {
                        var studentsQuery, studentData, students, studentOptionData, studentOptionQuery, studentOptions;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!companies_1[index]) {
                                        return [2 /*return*/, res.status(200).send({ data: companies_1 })];
                                    }
                                    studentsQuery = "select * from student where company_id = ? AND sub_department_id = ? AND acad_year = ?";
                                    studentData = [
                                        companies_1[index].company_id,
                                        companies_1[index].sub_department_id,
                                        globals_1.globals.school.ACAD_YEAR
                                    ];
                                    return [4 /*yield*/, dbInstance_1.runPreparedSelectQuery(studentsQuery, studentData)];
                                case 1:
                                    students = _a.sent();
                                    studentOptionData = [
                                        companies_1[index].sub_department_id,
                                        globals_1.globals.school.ACAD_YEAR
                                    ];
                                    studentOptionQuery = "select * from student where sub_department_id = ? AND acad_year = ?";
                                    return [4 /*yield*/, dbInstance_1.runPreparedSelectQuery(studentOptionQuery, studentOptionData)];
                                case 2:
                                    studentOptions = _a.sent();
                                    companies_1[index].students = students;
                                    companies_1[index].student_options = studentOptions;
                                    getPlacedStudents(++index);
                                    return [2 /*return*/];
                            }
                        });
                    });
                })(0);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log("internal error", error_1);
                return [2 /*return*/, res.status(422).send({ error: "Could not process request" })];
            case 3: return [2 /*return*/];
        }
    });
}); };
