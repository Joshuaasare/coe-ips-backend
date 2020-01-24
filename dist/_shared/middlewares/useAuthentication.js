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
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var globals_1 = require("../globals");
var Database_1 = require("../dbWrapper/Database");
var services_1 = require("../services");
function useAuthentication() {
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var token, payload, dbInstance, checkUserQuery;
            return __generator(this, function (_a) {
                token = req.headers.authorization.replace("Bearer ", "");
                try {
                    payload = jsonwebtoken_1.default.verify(token, globals_1.globals.JWT_SECRET_KEY);
                    console.log(payload);
                    req.user = payload;
                    dbInstance = new Database_1.Database();
                    checkUserQuery = "select * from user where id = ?";
                    if (!services_1.checkIfUserExists(dbInstance, checkUserQuery, [payload.userId])) {
                        return [2 /*return*/, res.status(401).send({ error: "Authentication Failed" })];
                    }
                    next();
                }
                catch (error) {
                    console.log(error);
                    if (error.name && error.name === globals_1.constants.errors.JSON_WEB_TOKEN_ERROR) {
                        return [2 /*return*/, res.status(401).send({ error: "user could not be verified" })];
                    }
                    return [2 /*return*/, res.status(422).send({ error: "request could not be proccessed" })];
                }
                return [2 /*return*/];
            });
        });
    };
}
exports.useAuthentication = useAuthentication;
