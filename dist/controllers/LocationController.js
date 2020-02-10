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
Object.defineProperty(exports, "__esModule", { value: true });
var decorators_1 = require("../_shared/decorators");
var services_1 = require("../_shared/services");
var LocationController = /** @class */ (function () {
    function LocationController() {
    }
    LocationController.prototype.getPlacesController = function (req, res) {
        return services_1.getPlacesFromSearchKey(req, res);
    };
    __decorate([
        decorators_1.get("/places-autocomplete"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LocationController.prototype, "getPlacesController", null);
    LocationController = __decorate([
        decorators_1.controller("/location")
    ], LocationController);
    return LocationController;
}());
