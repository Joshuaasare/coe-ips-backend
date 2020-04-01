"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
require("reflect-metadata");
var AppRouter_1 = require("../AppRouter");
var globals_1 = require("../globals");
function bodyValidators(keys) {
    return function (req, res, next) {
        if (!req.body) {
            return res.status(422).send('Invalid request');
        }
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (!req.body[key]) {
                return res.status(422).send("missing property " + key);
            }
        }
        next();
    };
}
function controller(routePrefix) {
    return function (target) {
        for (var key in target.prototype) {
            if (Object.prototype.hasOwnProperty.call(target.prototype, key)) {
                var routeHandler = target.prototype[key];
                var path = Reflect.getMetadata(globals_1.MetadataKeys.path, target.prototype, key);
                var method = Reflect.getMetadata(globals_1.MetadataKeys.method, target.prototype, key);
                var middlewares = Reflect.getMetadata(globals_1.MetadataKeys.middleware, target.prototype, key) ||
                    [];
                var requiredBodyProps = Reflect.getMetadata(globals_1.MetadataKeys.validator, target.prototype, key) ||
                    [];
                var validator = bodyValidators(requiredBodyProps);
                var router = AppRouter_1.AppRouter.getInstance();
                // eslint-disable-next-line no-console
                // console.log(routePrefix + path);
                if (path) {
                    router[method].apply(router, __spreadArrays(["" + routePrefix + path], middlewares, [validator,
                        routeHandler]));
                }
            }
        }
    };
}
exports.controller = controller;
