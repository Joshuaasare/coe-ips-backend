"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globals = {
    databaseParams: process.env.NODE_ENV === "production"
        ? {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        }
        : {
            host: "127.0.0.1",
            user: "root",
            password: "",
            database: "coe_ips"
        },
    school: {
        ACAD_YEAR: 2019
    },
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    SALT_ROUNDS: 10
};
exports.constants = {
    errors: {
        JSON_WEB_TOKEN_ERROR: "JsonWebTokenError"
    },
    user_type_id: {
        STUDENT: 1,
        COMPANY: 2,
        COORDINATOR: 3,
        ADMIN: 4
    }
};
var Methods;
(function (Methods) {
    Methods["get"] = "get";
    Methods["post"] = "post";
    Methods["patch"] = "patch";
    Methods["del"] = "delete";
    Methods["put"] = "put";
})(Methods = exports.Methods || (exports.Methods = {}));
var MetadataKeys;
(function (MetadataKeys) {
    MetadataKeys["method"] = "Method";
    MetadataKeys["path"] = "Path";
    MetadataKeys["middleware"] = "middleware";
    MetadataKeys["validator"] = "validator";
})(MetadataKeys = exports.MetadataKeys || (exports.MetadataKeys = {}));
