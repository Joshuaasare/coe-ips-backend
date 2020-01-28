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
var services_1 = require("../../_shared/services");
var saltRounds = 10;
exports.registerStudent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dbInstance, _a, surname, password, phone, department, email, foreignStudent, haveCompany, indexNumber, locationDetails, locationId, otherNames, programme, yearOfStudy, hash, checkEmailAddressQuery, addStudentQuery, addUserQuery, addLocationQuery, locationData, userData, emailExists, insertedLocation, insertedUser, studentData, response, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                dbInstance = req.dbInstance;
                _a = req.body.data, surname = _a.surname, password = _a.password, phone = _a.phone, department = _a.department, email = _a.email, foreignStudent = _a.foreignStudent, haveCompany = _a.haveCompany, indexNumber = _a.indexNumber, locationDetails = _a.locationDetails, locationId = _a.locationId, otherNames = _a.otherNames, programme = _a.programme, yearOfStudy = _a.yearOfStudy;
                return [4 /*yield*/, bcryptjs_1.default.hash(password, saltRounds)];
            case 1:
                hash = _b.sent();
                checkEmailAddressQuery = "select * from user where email = ?";
                addStudentQuery = "insert into student set ?";
                addUserQuery = "insert into user set ?";
                addLocationQuery = "insert into location set ?";
                locationData = {
                    name: locationDetails.name,
                    address: locationDetails.address,
                    latitude: locationDetails.coords.lat,
                    longitude: locationDetails.coords.lng,
                    created_at: Date.parse("" + new Date()),
                    last_modified: Date.parse("" + new Date())
                };
                userData = {
                    user_type_id: 1,
                    email: email,
                    password: hash,
                    created_at: Date.parse("" + new Date()),
                    last_modified: Date.parse("" + new Date())
                };
                return [4 /*yield*/, services_1.checkIfUserExists(dbInstance, checkEmailAddressQuery, [email])];
            case 2:
                emailExists = _b.sent();
                if (emailExists) {
                    res.status(409).send({ error: "User already exist" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, dbInstance.runPostQuery(addLocationQuery, locationData)];
            case 3:
                insertedLocation = _b.sent();
                return [4 /*yield*/, dbInstance.runPostQuery(addUserQuery, userData)];
            case 4:
                insertedUser = _b.sent();
                studentData = {
                    user_id: insertedUser.insertId,
                    index_number: indexNumber,
                    surname: surname,
                    other_names: otherNames,
                    main_department_id: department,
                    sub_department_id: programme,
                    phone: phone,
                    email: email,
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
                    created_at: Date.parse("" + new Date()),
                    last_modified: Date.parse("" + new Date())
                };
                return [4 /*yield*/, dbInstance.runPostQuery(addStudentQuery, studentData)];
            case 5:
                response = _b.sent();
                res.status(200).send({ data: response });
                return [2 /*return*/];
            case 6:
                error_1 = _b.sent();
                console.error("Internal error");
                console.log(error_1.code);
                if (error_1.code === "ER_DUP_ENTRY") {
                    return [2 /*return*/, res.status(409).send({ error: { message: "User already exist" } })];
                }
                return [2 /*return*/, res
                        .status(422)
                        .send({ error: { message: "Could not process request" } })];
            case 7: return [2 /*return*/];
        }
    });
}); };
