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
var globals_1 = require("../../../../_shared/globals");
var services_1 = require("../../../../_shared/services");
exports.registerStudent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dbInstance, _a, surname, password, phone, department, email, foreignStudent, haveCompany, indexNumber, locationDetails, locationId, otherNames, programme, yearOfStudy, hash, locationName, coords, address, route, locality, subLocality, district, region, country, locationData, userData, user, insertedLocation, insertedUser, studentData, response, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                dbInstance = req.dbInstance;
                _a = req.body.data, surname = _a.surname, password = _a.password, phone = _a.phone, department = _a.department, email = _a.email, foreignStudent = _a.foreignStudent, haveCompany = _a.haveCompany, indexNumber = _a.indexNumber, locationDetails = _a.locationDetails, locationId = _a.locationId, otherNames = _a.otherNames, programme = _a.programme, yearOfStudy = _a.yearOfStudy;
                return [4 /*yield*/, bcryptjs_1.default.hash(password, globals_1.globals.SALT_ROUNDS)];
            case 1:
                hash = _b.sent();
                locationName = locationDetails.name, coords = locationDetails.coords, address = locationDetails.address, route = locationDetails.route, locality = locationDetails.locality, subLocality = locationDetails.subLocality, district = locationDetails.district, region = locationDetails.region, country = locationDetails.country;
                locationData = [
                    address,
                    locationName + "," + locality + "," + country,
                    route + "," + locality + "," + district + "," + region + "," + country,
                    district,
                    region,
                    coords.lat,
                    coords.lng,
                    Date.parse("" + new Date()),
                    Date.parse("" + new Date())
                ];
                userData = [
                    globals_1.constants.user_type_id.STUDENT,
                    email,
                    hash,
                    Date.parse("" + new Date()),
                    Date.parse("" + new Date())
                ];
                return [4 /*yield*/, services_1.getEntityRecordFromKey("user", "email", [email], dbInstance)];
            case 2:
                user = _b.sent();
                if (!(user.length === 0)) {
                    res.status(409).send({ error: "User already exist" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, services_1.insertEntityRecord("location", "name, address, detailed_address, district, region, latitude, longitude,created_at, last_modified", "?,?,?,?,?,?,?,?,?", [locationData], dbInstance)];
            case 3:
                insertedLocation = _b.sent();
                return [4 /*yield*/, services_1.insertEntityRecord("user", "user_type_id, email,password,created_at, last_modified", "?,?,?,?,?", [userData], dbInstance)];
            case 4:
                insertedUser = _b.sent();
                studentData = [
                    insertedUser.insertId,
                    indexNumber,
                    surname,
                    otherNames,
                    department,
                    programme,
                    phone,
                    email,
                    yearOfStudy,
                    globals_1.globals.school.ACAD_YEAR,
                    locationDetails.name,
                    locationDetails.address,
                    locationId,
                    locationDetails.coords.lat,
                    locationDetails.coords.lng,
                    foreignStudent,
                    insertedLocation.insertId,
                    haveCompany === 0 ? 1 : 0,
                    Date.parse("" + new Date()),
                    Date.parse("" + new Date())
                ];
                return [4 /*yield*/, services_1.insertEntityRecord("student", "user_id,index_number,surname,other_names,main_department_id,sub_department_id,phone,email,year_of_study,acad_year,location,address,google_place_id,latitude,longitude,foreign_student,location_id,want_placement,created_at,last_modified", "?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?", [studentData], dbInstance)];
            case 5:
                response = _b.sent();
                return [2 /*return*/, res.status(200).send({ data: response })];
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
