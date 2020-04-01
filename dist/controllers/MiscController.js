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
var Misc_1 = __importDefault(require("../features/Misc"));
var middlewares_1 = require("../_shared/middlewares");
var MiscController = /** @class */ (function () {
    function MiscController() {
    }
    MiscController.prototype.root = function (req, res) {
        return res.send('hello world');
    };
    MiscController.prototype.testAuthenticated = function (req, res) {
        return Misc_1.default.testAuthenticated(req, res);
    };
    MiscController.prototype.testAuthorized = function (req, res) {
        return Misc_1.default.testAuthourized(req, res);
    };
    __decorate([
        decorators_1.get('/'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], MiscController.prototype, "root", null);
    __decorate([
        decorators_1.get('/testAuth'),
        decorators_1.use(middlewares_1.useAuthentication()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], MiscController.prototype, "testAuthenticated", null);
    __decorate([
        decorators_1.get('/authorized'),
        decorators_1.use(middlewares_1.useAuthorization()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], MiscController.prototype, "testAuthorized", null);
    MiscController = __decorate([
        decorators_1.controller('')
    ], MiscController);
    return MiscController;
}());
