/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import msql from 'mysql2';
import { globals, constants } from '../globals';

export interface PostRows {
  insertId?: number;
}

export interface MysqlQueryError {
  code: string;
}

export interface Rec {
  string: string | boolean | number;
}

export class Database {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private dbConnectionInstance: any;

  constructor() {
    if (!this.dbConnectionInstance) {
      this.dbConnectionInstance = msql.createConnection(globals.databaseParams);
      this.handleDisconnect();
    }
  }

  handleDisconnect(): void {
    this.dbConnectionInstance.connect((err: Error) => {
      if (err) {
      }
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.dbConnectionInstance.on('error', (err: Error) => {});
  }

  endDbConnection(): void {
    this.dbConnectionInstance.end();
  }

  runQuery(query: string): Promise<PostRows[]> {
    return new Promise((resolve, reject) => {
      this.dbConnectionInstance.query(query, (err: Error, rows: PostRows[]) => {
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
   *
   * returns the last inserted row during insertion
   */

  runPreparedQuery(
    preparedQuery: string,
    params: Array<Array<string | number | boolean>>
  ): Promise<PostRows | MysqlQueryError> {
    let lastInsertedRow = null;
    return new Promise((resolve, reject) => {
      const runQuery = (statement: any, i: number): void => {
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
          statement.execute(
            params[i],
            (err: MysqlQueryError, results: PostRows) => {
              lastInsertedRow = results;
              if (err) {
                reject(err);
              }
              runQuery(statement, ++i);
            }
          );
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

  /**
   * Exectutes a prepared Query for a cron/scheduled task
   * The special case here is if there's a server error relating to
   * duplicate entry in the database the code just skips to execute t
   * he query for the next set of params
   * @param preparedQuery
   * @param params
   */

  runPreparedQueryForCron(
    preparedQuery: string,
    params: Array<Array<string | number | boolean>>
  ): Promise<PostRows | MysqlQueryError> {
    let lastInsertedRow = null;
    return new Promise((resolve, reject) => {
      const runQuery = (statement: any, i: number): void => {
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
          statement.execute(
            params[i],
            (err: MysqlQueryError, results: PostRows) => {
              lastInsertedRow = results;
              if (err) {
                if (err.code === constants.errors.SQL_DUP_ENTRY) {
                  runQuery(statement, ++i);
                } else {
                  reject(err);
                }
              } else runQuery(statement, ++i);
            }
          );
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
  ): Promise<MysqlQueryError | Record<string, any>[]> {
    return new Promise((resolve, reject) => {
      this.dbConnectionInstance.execute(
        preparedQuery,
        params,
        (err: MysqlQueryError, rows: Record<string, any>[]) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }

  runPostQuery(
    query: string,
    values: Record<string, any>
  ): Promise<PostRows | MysqlQueryError> {
    return new Promise((resolve, reject) => {
      this.dbConnectionInstance.query(
        query,
        values,
        (err: MysqlQueryError, rows: PostRows) => {
          if (err) {
            reject(err);
          }
          resolve(rows);
        }
      );
    });
  }
}
