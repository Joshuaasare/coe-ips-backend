import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { Database } from './_shared/dbWrapper/Database';

import 'reflect-metadata';

import './controllers/AuthController';
import './controllers/StudentController';
import './controllers/MiscController';
import './controllers/CoordinatorController';
import './controllers/TaskController';
import './controllers/CompanyController';
import './controllers/LocationController';

import { AppRouter } from './_shared/AppRouter';

dotenv.config();

export interface RequestWithDbConnection extends Request {
  dbInstance: Database;
}

const app: Express = express();
app.use((req: RequestWithDbConnection, res: Response, next: NextFunction) => {
  const dbInstance: Database = new Database();
  function afterResponse(): void {
    res.removeListener('finish', afterResponse);
    res.removeListener('close', afterResponse);
    /**
     * if there is an active database connection, end it...
     */
    req.dbInstance.endDbConnection();
  }
  res.on('finish', afterResponse);
  res.on('close', afterResponse);

  /**
   * code below will run **before** the request
   */

  req.dbInstance = dbInstance;
  next();
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(AppRouter.getInstance());

const port: string | number = process.env.PORT || 3001;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`listening on port ${port}`);
});
