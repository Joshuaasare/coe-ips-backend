"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
                console.log("error when connecting to db:", err);
            }
        });
        this.dbConnectionInstance.on("error", function (err) {
            console.log("db error", err);
        });
    };
    Database.prototype.endDbConnection = function () {
        console.log("ending connection");
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
     */
    Database.prototype.runPreparedQuery = function (preparedQuery, params) {
        var _this = this;
        var lastInsertedRow = null;
        return new Promise(function (resolve, reject) {
            var runQuery = function (statement, i) {
                //console.log('i is ', i, 'params are ', params[i])
                if (params[i]) {
                    /**
                     * we have to use this kind of recursive calls
                     * because we need to run the queries for as many parameters
                     * as there are. Unfortunately, the function that executes the query
                     * is not sequential and does not return a promise. Instead it expects a callback
                     * so it is only in the callback that we can know if each query was successful
                     * TODO: look for a faster way, maybe??
                     */
                    statement.execute(params[i], function (err, results, fields) {
                        lastInsertedRow = results;
                        if (err) {
                            console.log("rejects here", err);
                            reject(err);
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
                    console.log("sql error" + err);
                    reject(err);
                }
                resolve(rows);
            });
        });
    };
    return Database;
}());
exports.Database = Database;