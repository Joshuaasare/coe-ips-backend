"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
var mysql2_1 = __importDefault(require("mysql2"));
var globals_1 = require("../globals");
var Database = /** @class */ (function () {
    function Database() {
        if (!this.dbConnectionInstance) {
            this.dbConnectionInstance = mysql2_1.default.createConnection(globals_1.globals.databaseParams);
            this.handleDisconnect();
        }
    }
    Database.prototype.handleDisconnect = function () {
        this.dbConnectionInstance.connect(function (err) {
            if (err) {
            }
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.dbConnectionInstance.on('error', function (err) { });
    };
    Database.prototype.endDbConnection = function () {
        this.dbConnectionInstance.end();
    };
    Database.prototype.runQuery = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.dbConnectionInstance.query(query, function (err, rows) {
                if (err)
                    reject(err);
                resolve(rows);
            });
        });
    };
    /**
     * Executes a database query and returns a PROMISE that resolves with the data
     * USE ONLY FOR, CREATE, UPDATE, DELETE,
     * !!!!!  DO NOT USE FOR READ !!!!!!
     *
     * prepared query shd look like this:
     * 'INSERT INTO movies (title, rating) VALUES (?, ?)'
     *
     * Array should look like this:
     * ['Taxi Driver', 100]
     *
     * returns the last inserted row during insertion
     */
    Database.prototype.runPreparedQuery = function (preparedQuery, params) {
        var _this = this;
        var lastInsertedRow = null;
        return new Promise(function (resolve, reject) {
            var runQuery = function (statement, i) {
                // console.log('i is ', i, 'params are ', params[i])
                if (params[i]) {
                    /**
                     * we have to use this kind of recursive calls
                     * because we need to run the queries for as many parameters
                     * as there are. Unfortunately, the function that executes the query
                     * is not sequential and does not return a promise. Instead it expects a callback
                     * so it is only in the callback that we can know if each query was successful
                     * TODO: look for a faster way, maybe??
                     */
                    statement.execute(params[i], function (err, results) {
                        lastInsertedRow = results;
                        if (err) {
                            reject(err);
                        }
                        runQuery(statement, ++i);
                    });
                }
                else
                    resolve(lastInsertedRow);
            };
            _this.dbConnectionInstance.prepare(preparedQuery, function (err, statement) {
                if (err)
                    reject(err);
                // for each element in the array, execute....
                else
                    runQuery(statement, 0);
            });
        });
    };
    /**
     * Exectutes a prepared Query for a cron/scheduled task
     * The special case here is if there's a server error relating to
     * duplicate entry in the database the code just skips to execute t
     * he query for the next set of params
     * @param preparedQuery
     * @param params
     */
    Database.prototype.runPreparedQueryForCron = function (preparedQuery, params) {
        var _this = this;
        var lastInsertedRow = null;
        return new Promise(function (resolve, reject) {
            var runQuery = function (statement, i) {
                // console.log('i is ', i, 'params are ', params[i])
                if (params[i]) {
                    /**
                     * we have to use this kind of recursive calls
                     * because we need to run the queries for as many parameters
                     * as there are. Unfortunately, the function that executes the query
                     * is not sequential and does not return a promise. Instead it expects a callback
                     * so it is only in the callback that we can know if each query was successful
                     * TODO: look for a faster way, maybe??
                     */
                    statement.execute(params[i], function (err, results) {
                        lastInsertedRow = results;
                        if (err) {
                            if (err.code === globals_1.constants.errors.SQL_DUP_ENTRY) {
                                runQuery(statement, ++i);
                            }
                            else {
                                reject(err);
                            }
                        }
                        else
                            runQuery(statement, ++i);
                    });
                }
                else
                    resolve(lastInsertedRow);
            };
            _this.dbConnectionInstance.prepare(preparedQuery, function (err, statement) {
                if (err)
                    reject(err);
                // for each element in the array, execute....
                else
                    runQuery(statement, 0);
            });
        });
    };
    Database.prototype.runPreparedSelectQuery = function (preparedQuery, params) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.dbConnectionInstance.execute(preparedQuery, params, function (err, rows) {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });
        });
    };
    Database.prototype.runPostQuery = function (query, values) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.dbConnectionInstance.query(query, values, function (err, rows) {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    };
    return Database;
}());
exports.Database = Database;
