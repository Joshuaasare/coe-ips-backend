import msql from "mysql2";
import { globals, constants } from "../globals";

export interface PostRows extends Error {
  insertId?: number;
}

export class Database {
  private dbConnectionInstance: any;

  constructor() {
    if (!this.dbConnectionInstance) {
      this.dbConnectionInstance = msql.createConnection(globals.databaseParams);
      this.handleDisconnect();
    }
  }

  handleDisconnect() {
    this.dbConnectionInstance.connect(function(err) {
      if (err) {
        console.log("error when connecting to db:", err);
      }
    });

    this.dbConnectionInstance.on("error", function(err) {
      console.log("db error", err);
    });
  }

  endDbConnection(): void {
    console.log("ending connection");
    this.dbConnectionInstance.end();
  }

  runQuery(query: string): any {
    return new Promise((resolve, reject) => {
      this.dbConnectionInstance.query(query, (err: Error, rows: PostRows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  }

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

  runPreparedQuery(
    preparedQuery: string,
    params: Array<Array<string | number | boolean>>
  ): any {
    let lastInsertedRow = null;
    return new Promise((resolve, reject) => {
      const runQuery = (statement: any, i: number) => {
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
          statement.execute(params[i], (err: Error, results, fields) => {
            lastInsertedRow = results;
            if (err) {
              console.log("rejects here", err);
              reject(err);
            } else runQuery(statement, ++i);
          });
        } else resolve(lastInsertedRow);
      };

      this.dbConnectionInstance.prepare(
        preparedQuery,
        (err: Error, statement: any) => {
          if (err) reject(err);
          // for each element in the array, execute....
          else runQuery(statement, 0);
        }
      );
    });
  }

  runPreparedQueryForCron(
    preparedQuery: string,
    params: Array<Array<string | number | boolean>>
  ): any {
    let lastInsertedRow = null;
    return new Promise((resolve, reject) => {
      const runQuery = (statement: any, i: number) => {
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
          statement.execute(params[i], (err, results, fields) => {
            lastInsertedRow = results;
            if (err) {
              if (err.code === constants.errors.SQL_DUP_ENTRY) {
                runQuery(statement, ++i);
              } else {
                reject(err);
              }
            } else runQuery(statement, ++i);
          });
        } else resolve(lastInsertedRow);
      };

      this.dbConnectionInstance.prepare(
        preparedQuery,
        (err: Error, statement: any) => {
          if (err) reject(err);
          // for each element in the array, execute....
          else runQuery(statement, 0);
        }
      );
    });
  }

  runPreparedSelectQuery(
    preparedQuery: string,
    params?: Array<string | number | boolean>
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.dbConnectionInstance.execute(
        preparedQuery,
        params,
        (err: Error, rows: Object[]) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }

  runPostQuery(query: string, values: Object): Promise<PostRows> {
    return new Promise((resolve, reject) => {
      this.dbConnectionInstance.query(
        query,
        values,
        (err: Error, rows: PostRows) => {
          if (err) {
            console.log("sql error" + err);
            reject(err);
          }
          resolve(rows);
        }
      );
    });
  }
}
