import express, { Express } from "express";
import "reflect-metadata";
import bodyParser from "body-parser";

import "./controllers/RootController";

import { AppRouter } from "./_shared/AppRouter";
const app: Express = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(AppRouter.getInstance());

const port: string | number = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
