import msql from "mysql2";
import { globals } from "../globals";

export class Database {
  private dbConnectionInstance: any;

  constructor() {
    if (!this.dbConnectionInstance) {
      this.dbConnectionInstance = msql.createConnection(globals.databaseParams);
    }
  }

  endDbConnection(): void {
    this.dbConnectionInstance.end();
  }

  get(query: string): any {
    return new Promise((resolve, reject) => {
      this.dbConnectionInstance.query(query, (err: Error, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  }
}
