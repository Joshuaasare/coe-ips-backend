import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

import "reflect-metadata";
import bodyParser from "body-parser";

import "./controllers";

import { AppRouter } from "./_shared/AppRouter";

const app: Express = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(AppRouter.getInstance());

const port: string | number = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
