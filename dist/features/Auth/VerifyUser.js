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
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var globals_1 = require("../../_shared/globals");
var services_1 = require("../../_shared/services");
exports.verifyUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dbInstance, _a, email, password, userTypeId, query, user, isPasswordMatch, userQuery, userTypeQuery, join, condition, mainUserQuery, data, payload, token, userDetails, _b, studentQuery, subDepartmentQuery, mainDepartmentQuery, join1, join2, condition_1, mainStudentQuery, student, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 9, , 10]);
                dbInstance = req.dbInstance;
                _a = req.body.data, email = _a.email, password = _a.password, userTypeId = _a.userTypeId;
                query = "select * from user where email = ? AND user_type_id = ?";
                return [4 /*yield*/, dbInstance.runPreparedSelectQuery(query, [
                        email,
                        userTypeId
                    ])];
            case 1:
                user = _c.sent();
                if (user.length === 0) {
                    return [2 /*return*/, res.status(404).send({
                            error: {
                                message: "User name does not exist"
                            }
                        })];
                }
                return [4 /*yield*/, bcryptjs_1.default.compare(password, user[0].password)];
            case 2:
                isPasswordMatch = _c.sent();
                if (!isPasswordMatch) {
                    return [2 /*return*/, res.status(401).send({
                            error: {
                                message: "Password is incorrect"
                            }
                        })];
                }
                userQuery = "user.id as user_id, user.email as user_email";
                userTypeQuery = "user_type.id as user_type_id, user_type.name as user_type_name";
                join = "user_type inner join user on user_type.id = user.user_type_id";
                condition = "user.id = ?";
                mainUserQuery = "select " + userQuery + ", " + userTypeQuery + " from " + join + " where " + condition + " ";
                return [4 /*yield*/, dbInstance.runPreparedSelectQuery(mainUserQuery, [
                        user[0].id
                    ])];
            case 3:
                data = _c.sent();
                payload = {
                    userId: data[0].user_id,
                    userType: data[0].user_type_name,
                    userTypeId: data[0].user_type_id
                };
                token = jsonwebtoken_1.default.sign(payload, globals_1.globals.JWT_SECRET_KEY);
                userDetails = {
                    userId: data[0].user_id,
                    email: data[0].user_email,
                    userTypeId: data[0].user_type_id,
                    userTypeName: data[0].user_type_name,
                    authToken: token
                };
                _b = userDetails.userTypeId;
                switch (_b) {
                    case globals_1.constants.user_type_id.STUDENT: return [3 /*break*/, 4];
                    case globals_1.constants.user_type_id.COORDINATOR: return [3 /*break*/, 6];
                }
                return [3 /*break*/, 7];
            case 4:
                studentQuery = "student.index_number as student_index_number, \n        student.surname as student_surname, \n        student.other_names as student_other_names, \n        student.phone as student_phone, \n        student.email as student_email, \n        student.year_of_study as student_year_of_study,\n        student.acad_year as student_acad_year, \n        student.address as student_address, \n        student.google_place_id as student_google_place_id";
                subDepartmentQuery = "sub_department.id as sub_department_id, \n        sub_department.name as sub_department_name";
                mainDepartmentQuery = "main_department.id as main_department_id,\n        main_department.name as main_department_name";
                join1 = "(student inner join sub_department on student.sub_department_id = sub_department.id)";
                join2 = "(main_department inner join " + join1 + " on sub_department.main_department_id = main_department.id)";
                condition_1 = "student.user_id = ?";
                mainStudentQuery = "select " + studentQuery + ", " + subDepartmentQuery + ", " + mainDepartmentQuery + " from " + join2 + " where " + condition_1;
                return [4 /*yield*/, dbInstance.runPreparedSelectQuery(mainStudentQuery, [userDetails.userId])];
            case 5:
                student = _c.sent();
                userDetails.otherNames = student[0].student_other_names;
                userDetails.lastName = student[0].student_surname;
                userDetails.indexNumber = student[0].student_index_number;
                userDetails.yearOfStudy = student[0].student_year_of_study;
                userDetails.acadYear = student[0].student_acad_year;
                userDetails.address = student[0].student_address;
                userDetails.mainDepartment = student[0].main_department_name;
                userDetails.subDepartment = student[0].sub_department_name;
                return [3 /*break*/, 8];
            case 6: return [3 /*break*/, 8];
            case 7: return [3 /*break*/, 8];
            case 8: return [2 /*return*/, res.status(200).send({ data: userDetails })];
            case 9:
                error_1 = _c.sent();
                console.error("Internal error");
                console.log(error_1);
                if (error_1.code === "ER_DUP_ENTRY") {
                    return [2 /*return*/, res.status(409).send({ error: "User already exist" })];
                }
                return [2 /*return*/, res.status(422).send({ error: "Could not process request" })];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.verifyWithToken = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, res.status(200).send({ data: req.user })];
    });
}); };
exports.resetPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, newPassword, dbInstance, user, hash, userData, updatePasswordQuery, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body.data, email = _a.email, newPassword = _a.newPassword;
                dbInstance = req.dbInstance;
                return [4 /*yield*/, services_1.getEntityRecordFromKey("user", "email", [email], dbInstance)];
            case 1:
                user = _b.sent();
                if (!user.length) {
                    return [2 /*return*/, res.status(404).send({ error: { message: "user not found" } })];
                }
                return [4 /*yield*/, bcryptjs_1.default.hash(newPassword, globals_1.globals.SALT_ROUNDS)];
            case 2:
                hash = _b.sent();
                userData = [hash, Date.parse("" + new Date()), email];
                updatePasswordQuery = "update user set password = ?, last_modified = ? where email = ?";
                return [4 /*yield*/, services_1.updateEntityRecord(updatePasswordQuery, [userData], dbInstance)];
            case 3:
                _b.sent();
                return [2 /*return*/, res.status(200).send({ data: "successful" })];
            case 4:
                error_2 = _b.sent();
                return [2 /*return*/, res.status(422).send({ error: "Could not process request" })];
            case 5: return [2 /*return*/];
        }
    });
}); };
