"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/camelcase */
exports.globals = {
    databaseParams: process.env.NODE_ENV === 'production'
        ? {
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            socketPath: "/cloudsql/" + process.env.CONNECTION_NAME,
        }
        : {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'coe_ips',
        },
    school: {
        ACAD_YEAR: 2019,
        DEFAULT_COMPANY_CODE: 2425,
    },
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    SALT_ROUNDS: 10,
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
};
exports.constants = {
    errors: {
        JSON_WEB_TOKEN_ERROR: 'JsonWebTokenError',
        SQL_DUP_ENTRY: 'ER_DUP_ENTRY',
    },
    user_type_id: {
        STUDENT: 1,
        COMPANY: 2,
        COORDINATOR: 3,
        ADMIN: 4,
    },
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
