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
var service_1 = __importDefault(require("../features/Students/service"));
var StudentController = /** @class */ (function () {
    function StudentController() {
    }
    StudentController.prototype.registerController = function (req, res) {
        return service_1.default.mutations.registerStudent(req, res);
    };
    StudentController.prototype.currentStudentkController = function (req, res) {
        return service_1.default.queries.getCurrentStudent(req, res);
    };
    StudentController.prototype.addStudentCompanyController = function (req, res) {
        return service_1.default.mutations.addStudentCompany(req, res);
    };
    StudentController.prototype.updateStudentCompanyController = function (req, res) {
        return service_1.default.mutations.updateStudentCompany(req, res);
    };
    StudentController.prototype.updateInternshipStartController = function (req, res) {
        return service_1.default.mutations.updateInternshipStart(req, res);
    };
    __decorate([
        decorators_1.post("/register"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], StudentController.prototype, "registerController", null);
    __decorate([
        decorators_1.get("/current-student"),
        decorators_1.use(middlewares_1.useAuthentication()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], StudentController.prototype, "currentStudentkController", null);
    __decorate([
        decorators_1.post("/add-student-company"),
        decorators_1.use(middlewares_1.useAuthentication()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], StudentController.prototype, "addStudentCompanyController", null);
    __decorate([
        decorators_1.put("/update-student-company"),
        decorators_1.use(middlewares_1.useAuthentication()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], StudentController.prototype, "updateStudentCompanyController", null);
    __decorate([
        decorators_1.put("/update-internship-start"),
        decorators_1.use(middlewares_1.useAuthentication()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], StudentController.prototype, "updateInternshipStartController", null);
    StudentController = __decorate([
        decorators_1.controller("/student")
    ], StudentController);
    return StudentController;
}());
