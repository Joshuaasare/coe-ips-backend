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
var axios_1 = __importDefault(require("axios"));
var globals_1 = require("../../../../_shared/globals");
var services_1 = require("../../../../_shared/services");
exports.updateLocationTableTask = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dbInstance_1, studentQuery, students_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                dbInstance_1 = req.dbInstance;
                studentQuery = "select * from student where acad_year = ? AND user_id > ?";
                return [4 /*yield*/, dbInstance_1.runPreparedSelectQuery(studentQuery, [
                        globals_1.globals.school.ACAD_YEAR,
                        2731,
                    ])];
            case 1:
                students_1 = _a.sent();
                return [2 /*return*/, (function updateLocation(index) {
                        return __awaiter(this, void 0, void 0, function () {
                            var googlePlaceId, locationId, url, resp, ac, result, routeObject, localityObject, metropolisObject, regionObject, countryObject, route, locality, regionName, districtName, countryName, name, address, detailedAddress, district, region, locationData, updateQuery;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!students_1[index]) {
                                            return [2 /*return*/, res.status(200).send({ data: 'successful' })];
                                        }
                                        googlePlaceId = students_1[index].google_place_id;
                                        locationId = students_1[index].location_id;
                                        url = "https://maps.googleapis.com/maps/api/place/details/json?place_id=" + googlePlaceId + "&key=" + globals_1.globals.GOOGLE_MAPS_API_KEY;
                                        return [4 /*yield*/, axios_1.default.get(url)];
                                    case 1:
                                        resp = _a.sent();
                                        ac = resp.data.result.address_components;
                                        result = resp.data.result;
                                        routeObject = ac.find(function (c) { return c.types.includes('route'); });
                                        localityObject = ac.find(function (c) { return c.types.includes('locality'); });
                                        metropolisObject = ac.find(function (c) {
                                            return c.types.includes('administrative_area_level_2');
                                        });
                                        regionObject = ac.find(function (c) {
                                            return c.types.includes('administrative_area_level_1');
                                        });
                                        countryObject = ac.find(function (c) { return c.types.includes('country'); });
                                        route = routeObject ? routeObject.short_name + "," : '';
                                        locality = localityObject ? localityObject.long_name + "," : '';
                                        regionName = regionObject ? regionObject.long_name : '';
                                        districtName = metropolisObject ? metropolisObject.long_name : '';
                                        countryName = countryObject ? countryObject.long_name : '';
                                        name = result.formatted_address;
                                        address = result.name + "," + locality + countryName;
                                        detailedAddress = "" + route + locality + districtName + "," + regionName + "," + countryName;
                                        district = districtName;
                                        region = regionName;
                                        locationData = [
                                            name,
                                            address,
                                            detailedAddress,
                                            district,
                                            region,
                                            locationId,
                                        ];
                                        updateQuery = "update location set name = ?, address = ?, detailed_address = ?,\n      district = ?, region = ? where id = ?";
                                        return [4 /*yield*/, services_1.updateEntityRecord(updateQuery, [locationData], dbInstance_1)];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/, updateLocation(++index)];
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
exports.resetCompanyArchiveLocation = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dbInstance_2, companies_1, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                dbInstance_2 = req.dbInstance;
                return [4 /*yield*/, services_1.getAllRecords('company_archive', dbInstance_2)];
            case 1:
                companies_1 = _a.sent();
                return [2 /*return*/, (function updateCompanyLocation(index) {
                        return __awaiter(this, void 0, void 0, function () {
                            var companyWithLocation, updateQuery, locationId, data;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!companies_1[index]) {
                                            return [2 /*return*/, res.status(200).send({ data: 'successful' })];
                                        }
                                        return [4 /*yield*/, services_1.getEntityRecordFromKey('company', 'name', [companies_1[index].name], dbInstance_2)];
                                    case 1:
                                        companyWithLocation = _a.sent();
                                        updateQuery = "update company_archive set location_id = ? where id = ?";
                                        locationId = companyWithLocation.length !== 0
                                            ? companyWithLocation[0].location_id
                                            : null;
                                        data = [locationId, companies_1[index].id];
                                        return [4 /*yield*/, services_1.updateEntityRecord(updateQuery, [data], dbInstance_2)];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/, updateCompanyLocation(++index)];
                                }
                            });
                        });
                    })(0)];
            case 2:
                error_2 = _a.sent();
                return [2 /*return*/, res.status(422).send({ error: 'Could not process request' })];
            case 3: return [2 /*return*/];
        }
    });
}); };
