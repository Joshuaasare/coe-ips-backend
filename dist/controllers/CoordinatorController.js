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
    CoordinatorController.prototype.addCompanyArchiveController = function (req, res) {
        service_1.default.mutations.addCompanyArchive(req, res);
    };
    CoordinatorController.prototype.getStudentsController = function (req, res) {
        service_1.default.queries.getAllStudents(req, res);
    };
    CoordinatorController.prototype.archivedCompaniesController = function (req, res) {
        service_1.default.queries.getArchivedCompanies(req, res);
    };
    CoordinatorController.prototype.archivedCompaniesWithContactMadeController = function (req, res) {
        service_1.default.queries.getArchivedCompaniesWithContactMade(req, res);
    };
    CoordinatorController.prototype.getSubDepartmentsController = function (req, res) {
        service_1.default.queries.getSubDepartments(req, res);
    };
    CoordinatorController.prototype.deleteCompanyArchiveController = function (req, res) {
        service_1.default.mutations.deleteCompanyArchive(req, res);
    };
    CoordinatorController.prototype.sendPlacementRequestController = function (req, res) {
        service_1.default.mutations.sendPlacementRequest(req, res);
    };
    CoordinatorController.prototype.updateCompanyArchiveController = function (req, res) {
        service_1.default.mutations.updateCompanyArchive(req, res);
    };
    CoordinatorController.prototype.updateCompanyArchiveLocationController = function (req, res) {
        service_1.default.mutations.updateCompanyArchiveLocation(req, res);
    };
    CoordinatorController.prototype.updateStudentController = function (req, res) {
        service_1.default.mutations.updateStudent(req, res);
    };
    CoordinatorController.prototype.updateStudentLocationController = function (req, res) {
        service_1.default.mutations.updateStudentLocation(req, res);
    };
    CoordinatorController.prototype.getCompaniesWithSlotsController = function (req, res) {
        service_1.default.queries.getCompaniesWithSlots(req, res);
    };
    CoordinatorController.prototype.updatePlacementController = function (req, res) {
        service_1.default.mutations.updatePlacement(req, res);
    };
    CoordinatorController.prototype.updateCompanyController = function (req, res) {
        service_1.default.mutations.updateCompany(req, res);
    };
    CoordinatorController.prototype.updateCompanyLocationController = function (req, res) {
        service_1.default.mutations.updateCompanyLocation(req, res);
    };
    CoordinatorController.prototype.getCompanyStudentsController = function (req, res) {
        service_1.default.queries.getCompanyStudents(req, res);
    };
    CoordinatorController.prototype.sendPlacementLetterController = function (req, res) {
        service_1.default.mutations.sendPlacementLetter(req, res);
    };
    __decorate([
        decorators_1.post("/add-company-archive"),
        decorators_1.use(middlewares_1.useAuthentication()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CoordinatorController.prototype, "addCompanyArchiveController", null);
    __decorate([
        decorators_1.get("/students"),
        decorators_1.use(middlewares_1.useAuthentication()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CoordinatorController.prototype, "getStudentsController", null);
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
    __decorate([
        decorators_1.get("/sub-departments"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CoordinatorController.prototype, "getSubDepartmentsController", null);
    __decorate([
        decorators_1.del("/delete-company-archive"),
        decorators_1.use(middlewares_1.useAuthentication()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CoordinatorController.prototype, "deleteCompanyArchiveController", null);
    __decorate([
        decorators_1.put("/placement-request"),
        decorators_1.use(middlewares_1.useAuthentication()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CoordinatorController.prototype, "sendPlacementRequestController", null);
    __decorate([
        decorators_1.put("/update-company-archive"),
        decorators_1.use(middlewares_1.useAuthentication()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CoordinatorController.prototype, "updateCompanyArchiveController", null);
    __decorate([
        decorators_1.put("/update-company-archive-location"),
        decorators_1.use(middlewares_1.useAuthentication()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CoordinatorController.prototype, "updateCompanyArchiveLocationController", null);
    __decorate([
        decorators_1.put("/update-student"),
        decorators_1.use(middlewares_1.useAuthentication()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CoordinatorController.prototype, "updateStudentController", null);
    __decorate([
        decorators_1.put("/update-student-location"),
        decorators_1.use(middlewares_1.useAuthentication()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CoordinatorController.prototype, "updateStudentLocationController", null);
    __decorate([
        decorators_1.get("/companies-with-slots"),
        decorators_1.use(middlewares_1.useAuthentication()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CoordinatorController.prototype, "getCompaniesWithSlotsController", null);
    __decorate([
        decorators_1.put("/update-placement"),
        decorators_1.use(middlewares_1.useAuthentication()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CoordinatorController.prototype, "updatePlacementController", null);
    __decorate([
        decorators_1.put("/update-company"),
        decorators_1.use(middlewares_1.useAuthentication()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CoordinatorController.prototype, "updateCompanyController", null);
    __decorate([
        decorators_1.put("/update-company-location"),
        decorators_1.use(middlewares_1.useAuthentication()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CoordinatorController.prototype, "updateCompanyLocationController", null);
    __decorate([
        decorators_1.get("/company-students"),
        decorators_1.use(middlewares_1.useAuthentication()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CoordinatorController.prototype, "getCompanyStudentsController", null);
    __decorate([
        decorators_1.put("/placement-letter"),
        decorators_1.use(middlewares_1.useAuthentication()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CoordinatorController.prototype, "sendPlacementLetterController", null);
    CoordinatorController = __decorate([
        decorators_1.controller("/coordinator")
    ], CoordinatorController);
    return CoordinatorController;
}());
