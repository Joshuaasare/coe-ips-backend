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
var forEach_1 = __importDefault(require("lodash/forEach"));
exports.registerCompany = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dbInstance, _a, id, name_1, email, contact, postal_address, website, repName, repContact, repEmail, locationId, locationDetails, code, departments, verifyCodeQuery, verifyCodeData, company, hash, locationData, userData, insertedLocation, insertedUser_1, companyData, insertedCompany, departmentsData_1, updateCompanyData, updateCompanyQuery, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 8, , 9]);
                dbInstance = req.dbInstance;
                console.log(req.body.data);
                _a = req.body.data, id = _a.id, name_1 = _a.name, email = _a.email, contact = _a.contact, postal_address = _a.postal_address, website = _a.website, repName = _a.repName, repContact = _a.repContact, repEmail = _a.repEmail, locationId = _a.locationId, locationDetails = _a.locationDetails, code = _a.code, departments = _a.departments;
                verifyCodeQuery = "select * from company_archive_contact_made  where acad_year = ? AND company_archive_id = ?";
                verifyCodeData = [globals_1.globals.school.ACAD_YEAR, id];
                return [4 /*yield*/, dbInstance.runPreparedSelectQuery(verifyCodeQuery, verifyCodeData)];
            case 1:
                company = _b.sent();
                console.log(company[0]);
                if (!company[0] || (company[0] && company[0].contact_made === 0)) {
                    return [2 /*return*/, res.status(404).send({ data: "Company has not been contacted" })];
                }
                if (company[0].code !== parseInt(code, 10)) {
                    return [2 /*return*/, res.status(401).send({ data: "Not Authenticated" })];
                }
                return [4 /*yield*/, bcryptjs_1.default.hash(contact, globals_1.globals.SALT_ROUNDS)];
            case 2:
                hash = _b.sent();
                locationData = [
                    locationDetails.name,
                    locationDetails.address,
                    locationDetails.coords.lat,
                    locationDetails.coords.lng,
                    Date.parse("" + new Date()),
                    Date.parse("" + new Date())
                ];
                userData = [
                    globals_1.constants.user_type_id.COMPANY,
                    email,
                    hash,
                    Date.parse("" + new Date()),
                    Date.parse("" + new Date())
                ];
                return [4 /*yield*/, services_1.insertEntityRecord("location", "name,address,latitude,longitude,created_at, last_modified", "?,?,?,?,?,?", [locationData], dbInstance)];
            case 3:
                insertedLocation = _b.sent();
                return [4 /*yield*/, services_1.insertEntityRecord("user", "user_type_id,email,password,created_at, last_modified", "?,?,?,?,?", [userData], dbInstance)];
            case 4:
                insertedUser_1 = _b.sent();
                companyData = [
                    insertedUser_1.insertId,
                    name_1,
                    email,
                    contact,
                    globals_1.globals.school.ACAD_YEAR,
                    insertedLocation.insertId,
                    postal_address,
                    website,
                    repName,
                    repContact,
                    repEmail,
                    Date.parse("" + new Date()),
                    Date.parse("" + new Date())
                ];
                return [4 /*yield*/, services_1.insertEntityRecord("company", "user_id,name,email,phone,acad_year,location_id,postal_address,website,representative_name,representative_phone,representative_email,created_at,last_modified", "?,?,?,?,?,?,?,?,?,?,?,?,?", [companyData], dbInstance)];
            case 5:
                insertedCompany = _b.sent();
                departmentsData_1 = [];
                forEach_1.default(departments, function (department) {
                    var dep = [
                        insertedUser_1.insertId,
                        department.id,
                        globals_1.globals.school.ACAD_YEAR,
                        department.number,
                        Date.parse("" + new Date()),
                        Date.parse("" + new Date())
                    ];
                    departmentsData_1.push(dep);
                });
                return [4 /*yield*/, services_1.insertEntityRecord("company_sub_department", "company_id,sub_department_id,acad_year,number_needed,created_at,last_modified", "?,?,?,?,?,?", departmentsData_1, dbInstance)];
            case 6:
                _b.sent();
                updateCompanyData = [globals_1.globals.school.ACAD_YEAR, id];
                updateCompanyQuery = "update company_archive_contact_made set responded = 1 where\n    acad_year = ? AND company_archive_id = ?";
                return [4 /*yield*/, services_1.updateEntityRecord(updateCompanyQuery, [updateCompanyData], dbInstance)];
            case 7:
                _b.sent();
                return [2 /*return*/, res.status(200).send({ data: "successful" })];
            case 8:
                error_1 = _b.sent();
                console.log("internal error", error_1);
                return [2 /*return*/, res.status(422).send({ error: "Could not process request" })];
            case 9: return [2 /*return*/];
        }
    });
}); };
