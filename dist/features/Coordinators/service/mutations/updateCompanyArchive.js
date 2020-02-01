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
exports.updateCompanyArchive = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dbInstance, _a, id, name_1, email, phone, postalAddress, requestLetterUrl, compData, query1, updated, compArchiveContactMadeData, query2, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                dbInstance = req.dbInstance;
                _a = req.body.data, id = _a.id, name_1 = _a.name, email = _a.email, phone = _a.phone, postalAddress = _a.postalAddress, requestLetterUrl = _a.requestLetterUrl;
                console.log(req.body.data);
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
                updated = _b.sent();
                if (!!services_1.isEmpty(requestLetterUrl)) return [3 /*break*/, 3];
                compArchiveContactMadeData = [
                    requestLetterUrl,
                    Date.parse("" + new Date()),
                    id,
                    globals_1.globals.school.ACAD_YEAR
                ];
                query2 = "update company_archive_contact_made set request_letter_url = ?,\n    last_modified = ? where company_archive_id = ? and acad_year = ?";
                return [4 /*yield*/, services_1.updateEntityRecord(query2, [compArchiveContactMadeData], dbInstance)];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3: return [2 /*return*/, res.status(200).send({ data: "Successful" })];
            case 4:
                error_1 = _b.sent();
                console.log("internal error", error_1);
                return [2 /*return*/, res.status(422).send({ error: "Could not process request" })];
            case 5: return [2 /*return*/];
        }
    });
}); };
