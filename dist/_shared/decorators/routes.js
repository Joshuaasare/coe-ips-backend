"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
require("reflect-metadata");
var globals_1 = require("../globals");
function routeBinder(method) {
    return function (path) {
        return function (target, key) {
            Reflect.defineMetadata(globals_1.MetadataKeys.path, path, target, key);
            Reflect.defineMetadata(globals_1.MetadataKeys.method, method, target, key);
        };
    };
}
exports.get = routeBinder(globals_1.Methods.get);
exports.put = routeBinder(globals_1.Methods.put);
exports.post = routeBinder(globals_1.Methods.post);
exports.del = routeBinder(globals_1.Methods.del);
exports.patch = routeBinder(globals_1.Methods.patch);
