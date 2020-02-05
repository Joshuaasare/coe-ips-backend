"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var decorators_1 = require("../_shared/decorators");
var Auth_1 = __importDefault(require("../features/Auth"));
var middlewares_1 = require("../_shared/middlewares");
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.prototype.verifyUser = function (req, res) {
        return Auth_1.default.verifyUser(req, res);
    };
    AuthController.prototype.resetPassword = function (req, res) {
        return Auth_1.default.resetPassword(req, res);
    };
    AuthController.prototype.verifyWithToken = function (req, res) {
        return Auth_1.default.verifyWithToken(req, res);
    };
    __decorate([
        decorators_1.post("/verify-user"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], AuthController.prototype, "verifyUser", null);
    __decorate([
        decorators_1.put("/reset-password"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], AuthController.prototype, "resetPassword", null);
    __decorate([
        decorators_1.get("/verify-with-token"),
        decorators_1.use(middlewares_1.useAuthentication()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], AuthController.prototype, "verifyWithToken", null);
    AuthController = __decorate([
        decorators_1.controller("/auth")
    ], AuthController);
    return AuthController;
}());
