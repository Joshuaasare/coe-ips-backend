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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer_1 = __importDefault(require("nodemailer"));
var services_1 = require("../../../../_shared/services");
var globals_1 = require("../../../../_shared/globals");
exports.updatePlacement = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, dbInstance_1, data_1;
    return __generator(this, function (_a) {
        try {
            user = req.user, dbInstance_1 = req.dbInstance;
            data_1 = req.body.data;
            (function runCompanyPlacement(index) {
                return __awaiter(this, void 0, void 0, function () {
                    var _a, companyId, companyName, students, companyLocation;
                    return __generator(this, function (_b) {
                        if (!data_1[index]) {
                            return [2 /*return*/, (function runPlacementRemove(i) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var companyStudents, studentsToChange;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (!data_1[i]) {
                                                        return [2 /*return*/, res.status(200).send({ data: "successful" })];
                                                    }
                                                    return [4 /*yield*/, dbInstance_1.runPreparedSelectQuery("Select * from student where company_id = ? AND sub_department_id = ? AND acad_year =  ?", [
                                                            data_1[i].companyId,
                                                            data_1[i].subDepartmentId,
                                                            globals_1.globals.school.ACAD_YEAR
                                                        ])];
                                                case 1:
                                                    companyStudents = _a.sent();
                                                    studentsToChange = companyStudents
                                                        .map(function (item) { return item.user_id; })
                                                        .filter(function (stud) { return !data_1[i].students.includes(stud); })
                                                        .map(function (stud) { return [null, stud]; });
                                                    console.log(studentsToChange);
                                                    return [4 /*yield*/, services_1.updateEntityRecord("update student set company_id = ? where user_id = ?", studentsToChange, dbInstance_1)];
                                                case 2:
                                                    _a.sent();
                                                    runPlacementRemove(++i);
                                                    return [2 /*return*/];
                                            }
                                        });
                                    });
                                })(0)];
                        }
                        _a = data_1[index], companyId = _a.companyId, companyName = _a.companyName, students = _a.students, companyLocation = _a.companyLocation;
                        (function runStudentPlacement(i) {
                            return __awaiter(this, void 0, void 0, function () {
                                var student, studentUpdateData, studentData;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            student = students[i];
                                            if (!student) {
                                                return [2 /*return*/, runCompanyPlacement(++index)];
                                            }
                                            studentUpdateData = [
                                                [data_1[index].companyId, Date.parse("" + new Date()), student]
                                            ];
                                            return [4 /*yield*/, services_1.getEntityRecordFromKey("student", "user_id", [student], dbInstance_1)];
                                        case 1:
                                            studentData = _a.sent();
                                            if (!studentData[0].company_id) {
                                                return [2 /*return*/, setStudentCompany(studentUpdateData, dbInstance_1, studentData, companyName, companyLocation, runStudentPlacement, i)];
                                            }
                                            if (studentData[0].company_id &&
                                                studentData[0].company_id !== companyId) {
                                                return [2 /*return*/, setStudentCompany(studentUpdateData, dbInstance_1, studentData, companyName, companyLocation, runStudentPlacement, i, true)];
                                            }
                                            runStudentPlacement(++i);
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        })(0);
                        return [2 /*return*/];
                    });
                });
            })(0);
        }
        catch (error) {
            console.log("internal error", error);
            return [2 /*return*/, res.status(422).send({ error: "Could not process request" })];
        }
        return [2 /*return*/];
    });
}); };
function setStudentCompany(data, dbInstance, studentData, companyName, companyLocation, callback, index, companyChange) {
    if (companyChange === void 0) { companyChange = false; }
    return __awaiter(this, void 0, void 0, function () {
        var transporter, mailOptions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    transporter = nodemailer_1.default.createTransport({
                        service: "gmail",
                        auth: {
                            user: "vacationtraining.knust.coe@gmail.com",
                            pass: "coe-vac-training-2019"
                        }
                    });
                    return [4 /*yield*/, services_1.updateEntityRecord("update student set company_id = ?, internship_placement_date = ? where user_id = ?", data, dbInstance)];
                case 1:
                    _a.sent();
                    mailOptions = companyChange
                        ? {
                            from: "knustcoeindustrialtraining@gmail.com",
                            to: studentData[0].email,
                            subject: "Vacation Training Placement Change",
                            text: "Hello " + studentData[0].surname + " " + studentData[0].other_names + "," +
                                "\n\nYour placement has been changed to" +
                                ("\n\n" + companyName + " - " + companyLocation) +
                                ("\n\nfor vacation training in the " + globals_1.globals.school.ACAD_YEAR + "/" + (globals_1.globals.school.ACAD_YEAR +
                                    1) + " academic year. Kindly Login to the internship platform, ") +
                                "print the acceptance letter and send it in person to your new company. " +
                                "Consult the internship guide on the platform or contact your coordinator if you have any questions"
                        }
                        : {
                            from: "knustcoeindustrialtraining@gmail.com",
                            to: studentData[0].email,
                            subject: "Vacation Training Placement",
                            text: "Hello " + studentData[0].surname + " " + studentData[0].other_names + "," +
                                "\n\nYou have been placed to" +
                                ("\n\n" + companyName + " - " + companyLocation) +
                                ("\n\nfor vacation training in the " + globals_1.globals.school.ACAD_YEAR + "/" + (globals_1.globals.school.ACAD_YEAR +
                                    1) + " academic year. Kindly Login to the internship platform, ") +
                                "print the acceptance letter and send it in person to your company. " +
                                "Consult the internship guide on the platform or contact your coordinator if you have any questions"
                        };
                    transporter.sendMail(mailOptions, function (err, info) {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (err) {
                                    console.log(err);
                                    callback(++index);
                                }
                                else {
                                    console.log(info);
                                    callback(++index);
                                }
                                return [2 /*return*/];
                            });
                        });
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.setStudentCompany = setStudentCompany;
