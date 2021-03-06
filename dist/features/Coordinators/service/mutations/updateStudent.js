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
/**
 * update student without location details
 * TODO: !!!!!! VERY IMPORTANT write query such that without location can be resued!!!!!!!!
 * !students can update with or without location so
 * !any change should be made twice
 * @param req request
 * @param res response
 */
exports.updateStudent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dbInstance, data, id, surname, otherNames, indexNumber, email, phone, userData, studentData, query1, query2, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                dbInstance = req.dbInstance;
                data = req.body.data;
                id = data.id, surname = data.surname, otherNames = data.otherNames, indexNumber = data.indexNumber, email = data.email, phone = data.phone;
                userData = [email, id];
                studentData = [
                    surname,
                    otherNames,
                    email,
                    indexNumber,
                    phone,
                    Date.parse("" + new Date()),
                    id,
                ];
                query1 = "update student set surname = ?, other_names = ?,\n    email = ?, index_number = ?, phone = ?, last_modified = ? where user_id = ? ";
                query2 = "update user set email = ? where id = ?";
                return [4 /*yield*/, services_1.updateEntityRecord(query1, [studentData], dbInstance)];
            case 1:
                _a.sent();
                return [4 /*yield*/, services_1.updateEntityRecord(query2, [userData], dbInstance)];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).send({ data: 'Successful' })];
            case 3:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(422).send({ error: 'Could not process request' })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateStudentLocation = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dbInstance, user, data, _a, id, surname, otherNames, indexNumber, email, phone, locationId, _b, locationName, coords, address, route, locality, district, region, country, google_place_id, studentData, locationData, userData, query1, query2, query3, error_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 4, , 5]);
                dbInstance = req.dbInstance, user = req.user;
                data = req.body.data;
                _a = data.studentDetails, id = _a.id, surname = _a.surname, otherNames = _a.otherNames, indexNumber = _a.indexNumber, email = _a.email, phone = _a.phone, locationId = _a.locationId;
                _b = data.locationDetails, locationName = _b.name, coords = _b.coords, address = _b.address, route = _b.route, locality = _b.locality, district = _b.district, region = _b.region, country = _b.country, google_place_id = _b.google_place_id;
                studentData = [
                    surname,
                    otherNames,
                    email,
                    indexNumber,
                    phone,
                    locationName,
                    address,
                    google_place_id,
                    coords.lat,
                    coords.lng,
                    Date.parse("" + new Date()),
                    id,
                ];
                locationData = [
                    address,
                    locationName + "," + locality + "," + country,
                    route + "," + locality + "," + district + "," + region + "," + country,
                    district,
                    region,
                    coords.lat,
                    coords.lng,
                    user.userId,
                    Date.parse("" + new Date()),
                    locationId,
                ];
                userData = [email, id];
                query1 = "update student set surname = ?, other_names = ?,\n    email = ?, index_number = ?, phone = ?, location = ?, address = ?,\n    google_place_id = ?, latitude = ?, longitude = ?, last_modified = ?\n    where user_id = ? ";
                query2 = "update location set name = ?, address = ?, detailed_address = ?,\n    district = ?, region = ?, latitude = ?, longitude = ?, updated_by = ?, last_modified = ? where id = ?";
                query3 = "update user set email = ? where id = ?";
                return [4 /*yield*/, services_1.updateEntityRecord(query1, [studentData], dbInstance)];
            case 1:
                _c.sent();
                return [4 /*yield*/, services_1.updateEntityRecord(query2, [locationData], dbInstance)];
            case 2:
                _c.sent();
                return [4 /*yield*/, services_1.updateEntityRecord(query3, [userData], dbInstance)];
            case 3:
                _c.sent();
                return [2 /*return*/, res.status(200).send({ data: 'Successful' })];
            case 4:
                error_2 = _c.sent();
                return [2 /*return*/, res.status(422).send({ error: 'Could not process request' })];
            case 5: return [2 /*return*/];
        }
    });
}); };
