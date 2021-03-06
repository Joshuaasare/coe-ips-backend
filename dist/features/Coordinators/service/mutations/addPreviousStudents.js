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
var services_1 = require("../../../../_shared/services");
exports.addPreviousStudents = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dbInstance_1, getStudentsQuery, students_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                dbInstance_1 = req.dbInstance;
                getStudentsQuery = "select * from student where acad_year = ?";
                return [4 /*yield*/, dbInstance_1.runPreparedSelectQuery(getStudentsQuery, [
                        2017,
                    ])];
            case 1:
                students_1 = _a.sent();
                return [2 /*return*/, (function updateStudent(index) {
                        return __awaiter(this, void 0, void 0, function () {
                            var currentStudent, updateUserData, updateUserQuery, getLocationQuery, location, getMainDepartmentQuery, subDepartment, updateStudentQuery, updateStudentData;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!students_1[index]) {
                                            return [2 /*return*/, res.status(200).send({ data: 'successful' })];
                                        }
                                        currentStudent = students_1[index];
                                        updateUserData = [currentStudent.email, currentStudent.user_id];
                                        updateUserQuery = "update user set email = ? where id = ?";
                                        return [4 /*yield*/, services_1.updateEntityRecord(updateUserQuery, [updateUserData], dbInstance_1)];
                                    case 1:
                                        _a.sent();
                                        getLocationQuery = "select * from location where id = ?";
                                        return [4 /*yield*/, dbInstance_1.runPreparedSelectQuery(getLocationQuery, [currentStudent.location_id])];
                                    case 2:
                                        location = _a.sent();
                                        getMainDepartmentQuery = "select * from sub_department where id = ?";
                                        return [4 /*yield*/, dbInstance_1.runPreparedSelectQuery(getMainDepartmentQuery, [currentStudent.sub_department_id])];
                                    case 3:
                                        subDepartment = _a.sent();
                                        updateStudentQuery = "update student set main_department_id = ?,location = ?, \n      address = ?,latitude = ?, longitude = ?, created_at = ? where user_id = ?";
                                        updateStudentData = [
                                            subDepartment[0].main_department_id,
                                            location[0].name,
                                            location[0].address,
                                            location[0].latitude,
                                            location[0].longitude,
                                            currentStudent.last_modified,
                                            currentStudent.user_id,
                                        ];
                                        return [4 /*yield*/, services_1.updateEntityRecord(updateStudentQuery, [updateStudentData], dbInstance_1)];
                                    case 4:
                                        _a.sent();
                                        return [2 /*return*/, updateStudent(++index)];
                                }
                            });
                        });
                    })(0)];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(422).send({ error: 'Could not process request' })];
            case 3: return [2 /*return*/];
        }
    });
}); };
