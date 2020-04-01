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
var services_1 = require("../../../../_shared/services");
exports.updateCompany = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dbInstance, data, id, email, placementLetterUrl, companyData, query1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                dbInstance = req.dbInstance;
                data = req.body.data;
                id = data.id, email = data.email, placementLetterUrl = data.placementLetterUrl;
                companyData = [
                    email,
                    placementLetterUrl,
                    id,
                    globals_1.globals.school.ACAD_YEAR,
                ];
                query1 = "update company set email = ?, placement_letter_url = ? where user_id = ? AND acad_year = ?";
                return [4 /*yield*/, services_1.updateEntityRecord(query1, [companyData], dbInstance)];
            case 1:
                _a.sent();
                return [2 /*return*/, res.status(200).send({ data: 'successful' })];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(422).send({ error: 'Could not process request' })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateCompanyLocation = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dbInstance, user, data, _a, id, email, placementLetterUrl, locationId, companyData, _b, locationName, coords, address, route, locality, district, region, country, locationData, query1, query2, error_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                dbInstance = req.dbInstance, user = req.user;
                data = req.body.data;
                _a = data.companyDetails, id = _a.id, email = _a.email, placementLetterUrl = _a.placementLetterUrl, locationId = _a.locationId;
                companyData = [
                    email,
                    placementLetterUrl,
                    id,
                    globals_1.globals.school.ACAD_YEAR,
                ];
                _b = data.locationDetails, locationName = _b.name, coords = _b.coords, address = _b.address, route = _b.route, locality = _b.locality, district = _b.district, region = _b.region, country = _b.country;
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
                query1 = "update company set email = ?, placement_letter_url = ? where user_id = ? AND acad_year = ?";
                query2 = "update location set name = ?, address = ?, detailed_address = ?,\n    district = ?, region = ?, latitude = ?, longitude = ?, updated_by = ?, last_modified = ? where id = ?";
                return [4 /*yield*/, services_1.updateEntityRecord(query1, [companyData], dbInstance)];
            case 1:
                _c.sent();
                return [4 /*yield*/, services_1.updateEntityRecord(query2, [locationData], dbInstance)];
            case 2:
                _c.sent();
                return [2 /*return*/, res.status(200).send({ data: 'successful' })];
            case 3:
                error_2 = _c.sent();
                return [2 /*return*/, res.status(422).send({ error: 'Could not process request' })];
            case 4: return [2 /*return*/];
        }
    });
}); };
