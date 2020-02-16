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
var globals_1 = require("../../../../_shared/globals");
exports.updateCompanyArchiveLocation = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, dbInstance, data, _a, id, name_1, email, phone, postalAddress, requestLetterUrl, locationId, _b, locationName, coords, address, route, locality, subLocality, district, region, country, compData, query1, updated, compArchiveContactMadeData, query2, locationData, query3, insertedLocation, query6, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 8, , 9]);
                user = req.user, dbInstance = req.dbInstance;
                data = req.body.data;
                console.log(data);
                _a = data.companyDetails, id = _a.id, name_1 = _a.name, email = _a.email, phone = _a.phone, postalAddress = _a.postalAddress, requestLetterUrl = _a.requestLetterUrl, locationId = _a.locationId;
                _b = data.locationDetails, locationName = _b.name, coords = _b.coords, address = _b.address, route = _b.route, locality = _b.locality, subLocality = _b.subLocality, district = _b.district, region = _b.region, country = _b.country;
                compData = [
                    name_1,
                    phone,
                    email,
                    postalAddress,
                    Date.parse("" + new Date()),
                    id
                ];
                query1 = "update company_archive set name = ?, phone = ?, email = ?, postal_address = ?,\n    last_modified = ? where id = ?";
                return [4 /*yield*/, services_1.updateEntityRecord(query1, [compData], dbInstance)];
            case 1:
                updated = _c.sent();
                if (!!services_1.isEmpty(requestLetterUrl)) return [3 /*break*/, 3];
                compArchiveContactMadeData = [
                    requestLetterUrl,
                    Date.parse("" + new Date()),
                    id,
                    globals_1.globals.school.ACAD_YEAR
                ];
                query2 = "update company_archive_contact_made set request_letter_url = ?,\n      last_modified = ? where company_archive_id = ? and acad_year = ?";
                return [4 /*yield*/, services_1.updateEntityRecord(query2, [compArchiveContactMadeData], dbInstance)];
            case 2:
                _c.sent();
                _c.label = 3;
            case 3:
                locationData = [
                    address,
                    locationName + "," + locality + "," + country,
                    route + "," + locality + "," + district + "," + region + "," + country,
                    district,
                    region,
                    coords.lat,
                    coords.lng,
                    user.userId,
                    Date.parse("" + new Date())
                ];
                if (!locationId) return [3 /*break*/, 5];
                locationData.push(locationId);
                console.log(locationData);
                query3 = "update location set name = ?, address = ?, detailed_address = ?,\n      district = ?, region = ?, latitude = ?, longitude = ?, updated_by = ?, last_modified = ? where id = ?";
                return [4 /*yield*/, services_1.updateEntityRecord(query3, [locationData], dbInstance)];
            case 4:
                _c.sent();
                return [2 /*return*/, res.status(200).send({ data: "successful" })];
            case 5:
                locationData.push(Date.parse("" + new Date()));
                console.log(locationData);
                return [4 /*yield*/, services_1.insertEntityRecord("location", "name, address, detailed_address, district,region,latitude, longitude,updated_by, created_at, last_modified", "?,?,?,?,?,?,?,?,?,?", [locationData], dbInstance)];
            case 6:
                insertedLocation = _c.sent();
                query6 = "update company_archive set location_id = ? where id = ?";
                return [4 /*yield*/, services_1.updateEntityRecord(query6, [[insertedLocation.insertId, id]], dbInstance)];
            case 7:
                _c.sent();
                return [2 /*return*/, res.status(200).send({ data: "successful" })];
            case 8:
                error_1 = _c.sent();
                console.log("internal error", error_1);
                return [2 /*return*/, res.status(422).send({ error: "Could not process request" })];
            case 9: return [2 /*return*/];
        }
    });
}); };
