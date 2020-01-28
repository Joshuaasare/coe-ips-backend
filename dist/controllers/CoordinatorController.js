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
var middlewares_1 = require("../_shared/middlewares");
var service_1 = __importDefault(require("../features/Coordinators/service"));
var CoordinatorController = /** @class */ (function () {
    function CoordinatorController() {
    }
    CoordinatorController.prototype.archivedCompaniesController = function (req, res) {
        service_1.default.queries.getArchivedCompanies(req, res);
    };
    CoordinatorController.prototype.archivedCompaniesWithContactMadeController = function (req, res) {
        service_1.default.queries.getArchivedCompaniesWithContactMade(req, res);
    };
    __decorate([
        decorators_1.get("/archived-companies"),
        decorators_1.use(middlewares_1.useAuthentication()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CoordinatorController.prototype, "archivedCompaniesController", null);
    __decorate([
        decorators_1.get("/archived-companies-contact-made"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CoordinatorController.prototype, "archivedCompaniesWithContactMadeController", null);
    CoordinatorController = __decorate([
        decorators_1.controller("/coordinator")
    ], CoordinatorController);
    return CoordinatorController;
}());