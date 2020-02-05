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
var services_1 = require("../../../../_shared/services");
var globals_1 = require("../../../../_shared/globals");
var nodemailer_1 = __importDefault(require("nodemailer"));
exports.sendPlacementRequest = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, dbInstance_1, ids_1, transporter_1;
    return __generator(this, function (_a) {
        try {
            user = req.user, dbInstance_1 = req.dbInstance;
            ids_1 = req.body.data.ids;
            transporter_1 = nodemailer_1.default.createTransport({
                service: "gmail",
                auth: {
                    user: "vacationtraining.knust.coe@gmail.com",
                    pass: "coe-vac-training-2019"
                }
            });
            console.log(ids_1);
            (function sendMail(index) {
                return __awaiter(this, void 0, void 0, function () {
                    var id, companyArchiveQuery, contactMadeQuery, join1, condition, mainQuery, company, code_1, mailOptions;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!ids_1[index]) {
                                    return [2 /*return*/, res.status(200).send({ data: "successful" })];
                                }
                                id = ids_1[index];
                                companyArchiveQuery = "company_archive.email";
                                contactMadeQuery = "company_archive_contact_made.contact_made as contact_made,\n      company_archive_contact_made.acad_year as acad_year,\n      company_archive_contact_made.request_letter_url as request_letter_url";
                                join1 = "(company_archive inner join company_archive_contact_made on \n      company_archive.id = company_archive_contact_made.company_archive_id)";
                                condition = "acad_year = ? AND company_archive_id = ?";
                                mainQuery = "select " + contactMadeQuery + ", " + companyArchiveQuery + " from " + join1 + " where " + condition;
                                return [4 /*yield*/, dbInstance_1.runPreparedSelectQuery(mainQuery, [
                                        globals_1.globals.school.ACAD_YEAR,
                                        id
                                    ])];
                            case 1:
                                company = _a.sent();
                                console.log(company[0]);
                                if (company[0].contact_made === 0 &&
                                    !services_1.isEmpty(company[0].request_letter_url) &&
                                    !services_1.isEmpty(company[0].email)) {
                                    console.log("send mail");
                                    code_1 = Math.floor(Math.random() * 8999 + 1000);
                                    mailOptions = {
                                        from: "knustcoeindustrialtraining@gmail.com",
                                        to: company[0].email,
                                        subject: "Industrial Training Request Letter",
                                        text: "Ing. Prof. Prince Yaw Andoh, PhD, MGhIE" +
                                            "\nAssociate Professor/Industrial Liaison" +
                                            "\nDepartment of Mechanical Engineering" +
                                            "\nCollege of Engineering" +
                                            "\nKwame Nkrumah University of Science and Technology" +
                                            "\nPrivate Mail Bag, University Post Office Kumasi, Ghana" +
                                            "\nTel: 024 2235674; 020 0960067; 0507970658\n\n" +
                                            'Please Visit "coeips.netlify.com" to register and select the number of students for each department needed\n' +
                                            "Use " +
                                            code_1 +
                                            " as verification code to upload",
                                        attachments: [
                                            {
                                                filename: "Placement Request Letter.pdf",
                                                path: company[0].request_letter_url
                                            }
                                        ]
                                    };
                                    transporter_1.sendMail(mailOptions, function (err, info) {
                                        return __awaiter(this, void 0, void 0, function () {
                                            var data, query, updated;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        if (!err) return [3 /*break*/, 1];
                                                        console.log(err);
                                                        return [3 /*break*/, 3];
                                                    case 1:
                                                        data = [code_1, id];
                                                        console.log(info);
                                                        query = "update company_archive_contact_made set contact_made = 1 , code = ? where id = ?";
                                                        return [4 /*yield*/, services_1.updateEntityRecord(query, [data], dbInstance_1)];
                                                    case 2:
                                                        updated = _a.sent();
                                                        sendMail(++index);
                                                        _a.label = 3;
                                                    case 3: return [2 /*return*/];
                                                }
                                            });
                                        });
                                    });
                                }
                                else {
                                    sendMail(++index);
                                }
                                return [2 /*return*/];
                        }
                    });
                });
            })(0);
        }
        catch (error) {
            console.log("internal error", error);
            return [2 /*return*/, res.status(422).send({ error: "Could not process request" })];
        }
        return [2 /*return*/];
    });
}); };
/**
Ing. Prof. P. Y. Andoh, PhD; MGhIE
Associate Professor/Industrial Liaison
Department of Mechanical Engineering
College of Engineering
Kwame Nkrumah University Of Science and Technology
Private Mail Bag, University Post Office Kumasi, Ghana
Tel: 024 2235674; 020 0960067; 050 7970658
 */
