"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var Database_1 = require("./_shared/dbWrapper/Database");
require("reflect-metadata");
var body_parser_1 = __importDefault(require("body-parser"));
var app = express_1.default();
app.use(function (req, res, next) {
    var dbInstance = new Database_1.Database();
    function afterResponse() {
        res.removeListener("finish", afterResponse);
        res.removeListener("close", afterResponse);
        /**
         * if there is an active database connection, end it...
         */
        req.dbInstance.endDbConnection();
    }
    res.on("finish", afterResponse);
    res.on("close", afterResponse);
    /**
     * code below will run **before** the request
     */
    req.dbInstance = dbInstance;
    next();
});
require("./controllers/AuthController");
require("./controllers/StudentController");
require("./controllers/MiscController");
require("./controllers/CoordinatorController");
require("./controllers/TaskController");
var AppRouter_1 = require("./_shared/AppRouter");
app.use(cors_1.default());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use(AppRouter_1.AppRouter.getInstance());
var port = process.env.PORT || 3001;
app.listen(port, function () {
    console.log("listening on port " + port);
});
