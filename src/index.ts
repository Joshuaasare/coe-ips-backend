import express, { Express } from "express";
import bodyParser from "body-parser";

const app: Express = express();

app.use(bodyParser.urlencoded({ extended: true }));

const port: string | number = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
